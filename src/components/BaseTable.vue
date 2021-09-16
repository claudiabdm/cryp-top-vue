<template>
  <div class="table-outer">
    <div class="table-inner">
      <table class="table">
        <thead class="table__header">
          <tr>
            <th
              scope="col"
              v-for="(column, key) of columns"
              :data-col="key"
              :key="key"
              :class="['table__cell', column.align]"
            >
              <div class="table__cell-inner">
                {{ column.name }}
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
          <tr v-if="rows == null">
            <td
              class="center table__spinner"
              :colspan="Object.keys(columns).length"
            >
              <BaseLoadingSpinner />
            </td>
          </tr>
          <tr v-else-if="rows.length === 0">
            <td class="center" :colspan="Object.keys(columns).length">
              Data not found
            </td>
          </tr>
          <template v-else>
            <template v-for="row in rows" :key="row.Id">
              <tr class="table__row">
                <template
                  v-for="(column, columnName) of columns"
                  :key="columnName"
                >
                  <td
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
                        {{ row[columnName] }}
                      </div>
                    </slot>
                  </td>
                </template>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from 'vue';
import BaseLoadingSpinner from '@/components/BaseLoadingSpinner.vue';

interface Column {
  [key: string]: {
    name: string;
    align: 'center' | 'left' | 'right';
  };
}

export default defineComponent({
  name: 'MyTable',
  components: {
    BaseLoadingSpinner,
  },
  props: {
    columns: {
      type: Object as PropType<Column>,
      required: true,
    },
    rows: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const alertActive = ref('polite');
    const ariaBusy = ref(true);

    watchEffect(() => {
      if (props.rows != null) {
        alertActive.value = 'off';
        ariaBusy.value = false;
      }
    });

    return { alertActive, ariaBusy };
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
  background-color: #fff;
  box-shadow: 0 0 rem(5px) rem(2px) var(--grey-200);
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
  }

  &__spinner {
    @include absolute(auto, auto, 50%, 50%);
    @include flex(center, center);
    transform: translate3d(-50%, 0, 0);
  }
}

.left {
  text-align: left;
  justify-content: flex-start;
}
.right {
  text-align: right;
  justify-content: flex-end;
}
.center {
  text-align: center;
  justify-content: center;
}
</style>
