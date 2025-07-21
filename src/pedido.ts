// Clase base genérica
class Item {
  protected name: string;
  protected unitPrice: number;

  constructor(name: string, unitPrice: number) {
    if (!name || unitPrice <= 0) {
      throw new Error("Nombre inválido o precio no válido.");
    }
    this.name = name;
    this.unitPrice = unitPrice;
  }

  getName(): string {
    return this.name;
  }

  getUnitPrice(): number {
    return this.unitPrice;
  }
}

// Clase específica para platos
class Dish extends Item {
  constructor(name: string, unitPrice: number) {
    super(name, unitPrice);
  }
}

// Representa un plato en el pedido con su cantidad
class OrderItem {
  private dish: Dish;
  private quantity: number;

  constructor(dish: Dish, quantity: number) {
    if (quantity <= 0 || !Number.isInteger(quantity)) {
      throw new Error(\`Cantidad inválida para \${dish.getName()}: \${quantity}\`);
    }
    this.dish = dish;
    this.quantity = quantity;
  }

  getTotal(): number {
    return this.dish.getUnitPrice() * this.quantity;
  }

  toString(): string {
    return \`\${this.quantity} x \${this.dish.getName()} @ \${this.dish.getUnitPrice().toFixed(2)}€ = \${this.getTotal().toFixed(2)}€\`;
  }
}

// Clase principal: Pedido
class Order {
  private items: OrderItem[] = [];

  addItem(item: OrderItem): void {
    this.items.push(item);
  }

  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
  }

  printReceipt(): void {
    console.log("🧾 Resumen del Pedido:");
    this.items.forEach(item => console.log(item.toString()));
    console.log(\`Total: \${this.calculateTotal().toFixed(2)}€\`);
  }
}

// --- EJEMPLO DE USO ---
const dish1 = new Dish("Pizza", 8.5);
const dish2 = new Dish("Pasta", 6.0);

const orderItem1 = new OrderItem(dish1, 2); // 2 pizzas
const orderItem2 = new OrderItem(dish2, 3); // 3 pastas

const order = new Order();
order.addItem(orderItem1);
order.addItem(orderItem2);

order.printReceipt();
