import { atom, selector } from "recoil";

export const invoicesState = atom({
  key: "invoicesState",
  default: [],
});

export const filtersState = atom({
  key: "filtersState",
  default: [],
});

export const filteredInvoicesState = selector({
  key: "filteredInvoicesState",
  get: ({ get }) => {
    const invoices = get(invoicesState);
    const filters = get(filtersState);

    if (filters.length === 0) return invoices;
    return invoices.filter((invoice) =>
      filters.includes(invoice.status.toLowerCase())
    );
  },
});
