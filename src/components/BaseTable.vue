<template>
  <div class="table-outer">
    <div class="table-inner">
      <table class="table">
        <thead class="table__header">
          <tr>
            <th
              scope="col"
              v-for="(column, columnName) of columns"
              :data-col="columnName"
              :key="columnName"
              class="table__cell"
              @click="sortBy({ name: columnName, type: column.type })"
            >
              <div
                :class="[
                  'table__cell-inner',
                  'table__cell-inner--flex',
                  column.align,
                ]"
              >
                <span>
                  {{ column.name }}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  :class="[
                    'table__icon',
                    `table__icon--${columnState}`,
                    { 'table__icon--none': columnSorted.name !== columnName },
                  ]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
                  />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody
          class="table__body"
          role="alert"
          :aria-live="alertActive"
          :aria-busy="ariaBusy"
        >
          <tr v-if="sortedRows == null">
            <td
              class="center table__spinner"
              :colspan="Object.keys(columns).length"
            >
              <BaseLoadingSpinner />
            </td>
          </tr>
          <tr v-else-if="sortedRows.length === 0">
            <td class="center" :colspan="Object.keys(columns).length">
              Data not found
            </td>
          </tr>
          <template v-else>
            <transition-group name="list-complete">
              <tr
                class="table__row list-complete-item"
                v-for="row in sortedRows"
                :key="row"
              >
                <td
                  v-for="(column, columnName) of columns"
                  :key="columnName"
                  :class="['table__cell', column.align]"
                  :data-col="columnName"
                >
                  <slot
                    name="rowContent"
                    :row="row"
                    :value="row[columnName]"
                    :columnName="columnName"
                  >
                    <div class="table__cell-inner">
                      <slot
                        :name="columnName"
                        :row="row"
                        :value="row[columnName]"
                        :columnName="columnName"
                      >
                        {{ row[columnName] }}
                      </slot>
                    </div>
                  </slot>
                </td>
              </tr>
            </transition-group>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, defineComponent, PropType, ref, watchEffect } from 'vue';
import BaseLoadingSpinner from '@/components/BaseLoadingSpinner.vue';

interface Column {
  name: string;
  align: 'center' | 'left' | 'right';
  type: ColumnType;
}

type ColumnType = 'number' | 'string' | 'date' | null;
type ColumnState = 'up' | 'down' | 'none';

export default defineComponent({
  name: 'BaseTable',
  components: {
    BaseLoadingSpinner,
  },
  props: {
    columns: {
      type: Object as PropType<{ [key: string]: Column }>,
      required: true,
    },
    rows: {
      type: Array as PropType<{ [key: string]: string }[]>,
      default: null,
    },
  },
  emits: ['sortBy'],
  setup(props) {
    const alertActive = ref('polite');
    const ariaBusy = ref(true);
    const columnState = ref<ColumnState>('none');
    const columnSorted = ref<{
      name: string;
      type: ColumnType;
    }>({
      name: '',
      type: 'string',
    });

    const sortedRows = computed(() => {
      if (props.rows) {
        return _sortRows(props.rows, columnSorted.value, columnState.value);
      }
      return null;
    });

    watchEffect(() => {
      if (props.rows != null) {
        alertActive.value = 'off';
        ariaBusy.value = false;
      }
    });

    function sortBy(column: Column) {
      _setColumnState(column.name);
      columnSorted.value = { name: column.name, type: column.type };
    }

    function _setColumnState(newColumnName: string) {
      if (
        columnSorted.value.name !== '' &&
        columnSorted.value.name !== newColumnName
      ) {
        columnState.value = 'up';
        return;
      }
      if (columnState.value == 'none') {
        columnState.value = 'up';
      } else if (columnState.value == 'up') {
        columnState.value = 'down';
      } else {
        columnState.value = 'none';
        columnSorted.value = { name: '', type: 'string' };
      }
    }

    function _sortRows(
      rows: { [key: string]: any }[],
      column: {
        name: string;
        type: ColumnType;
      },
      columnState: ColumnState
    ) {
      if (column.type == null || column.type == 'string') {
        return _sortRowsByCol(rows, column.name, columnState);
      }
    }

    function _sortRowsByCol(
      rows: { [key: string]: any }[],
      columnName: string,
      columnState: ColumnState
    ) {
      if (columnState == 'up') {
        return [...rows].sort((a, b) =>
          a[columnName] < b[columnName]
            ? -1
            : a[columnName] === b[columnName]
            ? 0
            : 1
        );
      } else if (columnState == 'down') {
        return [...rows].sort((a, b) =>
          a[columnName] > b[columnName]
            ? -1
            : a[columnName] === b[columnName]
            ? 0
            : 1
        );
      } else {
        return [...rows];
      }
    }

    return {
      alertActive,
      ariaBusy,
      sortBy,
      sortedRows,
      columnState,
      columnSorted,
    };
  },
});
</script>
<style lang="scss">
@use '../styles/mixins/mixins' as *;

$rows: 10;
$row-height: 55px;
$header-height: 45px;

.table-outer {
  height: 100%;
  padding: rem(10px);
  overflow: hidden;
}

.table-inner {
  @include size(100%, 100%);
  position: relative;
  min-height: $row-height * $rows + $header-height;
  border-radius: rem(10px);
  overflow-x: auto;
  overflow-y: hidden;
  background-color: #fff;
  box-shadow: var(--box-shadow);
}

.table {
  display: table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  overflow-x: auto;
  white-space: nowrap;

  &__header {
    font-size: rem(14px);
    font-weight: 700;
    .table__cell {
      cursor: pointer;
    }
    .table__cell:first-child {
      border-top-left-radius: rem(10px);
    }
    .table__cell:last-child {
      border-top-right-radius: rem(10px);
    }
  }

  &__body {
    font-weight: 300;
  }

  &__row {
    background-color: #fff;
    &:hover {
      .table__cell {
        background: var(--grey-200);
      }
      a {
        cursor: pointer;
      }
    }
    &:last-child {
      .table__cell {
        border-bottom: 0;
        &:first-child {
          border-bottom-left-radius: rem(10px);
        }
        &:last-child {
          border-bottom-right-radius: rem(10px);
        }
      }
    }
  }

  &__row-content {
    display: inline-flex;
    width: 100%;
    align-items: center;
  }

  &__cell {
    vertical-align: middle;
    border-bottom: 1px solid var(--grey-300);
    &:first-child {
      position: sticky;
      left: 0;
      background-color: #fff;
    }
  }

  &__cell-inner {
    display: block;
    padding: rem(15px) rem(20px);

    &--flex {
      @include flex(center, inherit);
    }
  }

  &__spinner {
    @include absolute(auto, auto, 50%, 50%);
    @include flex(center, center);
    transform: translate3d(-50%, 0, 0);
  }

  &__icon {
    margin: 0.5em;
    color: var(--primary);
    transition-delay: opacity transform;
    transition: 0.15s linear;
    &--up {
      transform: rotate(0deg);
    }
    &--none {
      opacity: 0;
      transform: rotate(60deg);
    }
    &--down {
      transform: rotate(180deg);
    }
  }
}

.left {
  text-align: left;
  justify-content: flex-start;
}
.right {
  text-align: right;
  flex-direction: row-reverse;
}
.center {
  text-align: center;
  justify-content: center;
}

.list-complete-item {
  transition: transform 0.7s ease;
}

.list-complete-enter-from,
.list-complete-leave-to {
  transform: translate3d(0, $row-height, 0);
}

.list-complete-leave-active {
  position: absolute;
  box-shadow: var(--box-shadow);
}
</style>
