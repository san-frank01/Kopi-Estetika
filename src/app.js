document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Rousta Brazil", img: "1.jpg", price: 20000 },
      { id: 2, name: "Luwak coffe", img: "2.jpg", price: 15000 },
      { id: 3, name: "Coffe Latte", img: "3.jpg", price: 25000 },
      { id: 4, name: "Black Coffe", img: "4.jpg", price: 15000 },
      { id: 5, name: "Arabica Blend", img: "5.jpg", price: 30000 },
    ],
  }));
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //cek apakah ada barang yang sama
      const cartItem = this.items.find((item) => item.id === newItem.id);
      //jika belum ada/ kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        //jika barangnya sudah ada, cek apakah barang beda atau sama dengan yang ada cart
        this.items = this.items.map((item) => {
          //jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            //jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      //ambil item yang mau di remove berdasarkan idnya
      const cartItem = this.items.find((item) => item.id === id);

      //jika item leih dari satu
      if (cartItem.quantity > 1) {
        //menelusuri satu-satu
        this.items = this.items.map((item) => {
          //jika bukan barang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        //jika barangnya sisa satu
        this.items = this.items.filter((item) => item.id != id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

//konversi rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
