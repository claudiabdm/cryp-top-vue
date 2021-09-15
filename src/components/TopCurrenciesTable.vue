<template>
  <BaseTable :rows="currencies" :columns="$options.columns">
    <template v-slot:rowContent="{ row, value, columnName }">
      <RouterLink class="table__cell-inner" :to="`/currencies/${row.name}`">
        <template v-if="columnName === 'name'">
          <div class="top-crypto-table__name">
            <img
              class="top-crypto-table__logo"
              :src="`https://www.cryptocompare.com/${row.logo}`"
              alt=""
              srcset=""
              width="24"
              height="24"
            />
            <span>
              {{ row.name }}
            </span>
          </div>
        </template>
        <template v-else-if="columnName === 'change24h'">
          <span
            :class="[
              {
                up: !row.change24h.includes('-'),
                down: row.change24h.includes('-'),
              },
            ]"
          >
            {{ row.change24h }}
          </span>
        </template>
        <template v-else>
          {{ value }}
        </template>
      </RouterLink>
    </template>
  </BaseTable>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import BaseTable from '@/components/BaseTable.vue';
import { Currency } from '@/types/models';

export default defineComponent({
  components: {
    BaseTable,
  },
  columns: {
    name: {
      name: 'Name',
      align: 'left',
    },
    price: {
      name: 'Price',
      align: 'right',
    },
    marketCap: {
      name: 'Market Cap',
      align: 'right',
    },
    change24h: {
      name: 'Change (24h)',
      align: 'right',
    },
    volume24h: {
      name: 'Volume (24h)',
      align: 'right',
    },
  },
  props: {
    currencies: {
      type: Array as PropType<Currency[]>,
      default: () => null,
    },
  },
});
</script>

<style lang="scss" scoped>
@use '../styles/mixins/mixins' as *;

.top-crypto-table {
  &__name {
    @include flex(center, flex-start);
  }
  &__logo {
    margin-right: rem(10px);
  }
}

.up {
  color: var(--secondary);
}
.down {
  color: var(--tertiary);
}
</style>
