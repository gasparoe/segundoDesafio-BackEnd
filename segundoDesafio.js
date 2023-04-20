const fs = require("fs");

//Creo la clase ProductManager

class ProductManager {
  constructor(path) {
    this.products = [];
    this.id = 1;
    this.path = path;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (
      title != undefined &&
      description != undefined &&
      price != undefined &&
      thumbnail != undefined &&
      code != undefined &&
      stock != undefined
    ) {
      //Incremento el id cada vez que se crea un producto nuevo

      let product = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        id: this.id,
      };

      if (fs.existsSync(this.path)) {
        let read = fs.readFileSync(this.path, "utf-8");
        this.products = JSON.parse(read);
      }
      if (this.products.find((producto) => producto.code === product.code)) {
        console.log("Ya existe un producto con ese codigo");
      } else {
        this.products.push(product);
        fs.writeFileSync(this.path, JSON.stringify(this.products), "utf-8");
        this.id++;
        console.log("El archivo se guardo correctamente");
      }
    } else {
      console.log(
        "No se puede crear el producto. Faltan definir caracteristicas"
      );
    }
  }

  getProducts() {
    if (fs.existsSync(this.path)) {
      let read = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(read);
    }
    return this.products;
  }

  getProductById(id) {
    if (fs.existsSync(this.path)) {
      let read = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(read);
    }
    let product = this.products.find((producto) => producto.id === id);
    if (product) {
      console.log(`Se ha encontrado el producto con ID ${id}.`);
      return product;
    } else {
      console.error("Not found");
      return;
    }
  }

  updateProduct(id, nuevoProducto) {
    let isUpdated = false;

    if (fs.existsSync(this.path)) {
      let read = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(read);
    }
    this.products.forEach((producto, index) => {
      if (producto.id === id) {
        if (nuevoProducto.title != undefined) {
          producto.title = nuevoProducto.title;
        }

        if (nuevoProducto.description != undefined) {
          producto.description = nuevoProducto.description;
        }

        if (nuevoProducto.price != undefined) {
          producto.price = nuevoProducto.price;
        }

        if (nuevoProducto.thumbnail != undefined) {
          producto.thumbnail = nuevoProducto.thumbnail;
        }

        if (nuevoProducto.code != undefined) {
          producto.code = nuevoProducto.code;
        }

        if (nuevoProducto.stock != undefined) {
          producto.stock = nuevoProducto.stock;
        }

        //ANTES DE ACTUALIZAR EL PRODUCTO, VERIFICO QUE EL NUEVO CODIGO DEL PRODUCTO ACTUALIZADO NO EXISTA
        if (
          this.products.find(
            (product) =>
              product.code === producto.code && product.id !== producto.id
          )
        ) {
          console.log("Ya existe un producto con ese codigo");
        } else {
          this.products[index] = producto;
          fs.writeFileSync(this.path, JSON.stringify(this.products), "utf-8");
          isUpdated = true;
        }
      }
    });
    if (isUpdated) {
      console.log("Se ha actualizado el producto correctamente");
    } else {
      console.log("No se ha podido actualizar el producto");
    }
  }

  deleteProduct(id) {
    let isDeleted = false;

    if (fs.existsSync(this.path)) {
      let read = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(read);
    }
    this.products.forEach((producto, index) => {
      if (producto.id === id) {
        this.products.splice(index, 1);
        isDeleted = true;
      }
    });
    fs.writeFileSync(this.path, JSON.stringify(this.products), "utf-8");
    if (isDeleted) {
      console.log("Se elimino el producto correctamente");
    } else {
      console.log("No se ha encontrado el producto a eliminar");
    }
  }
}

//Instancia de la clase ProductManager con el path del archivo
let instanciaProducto = new ProductManager("./products.json");

//Muestro por consola que el array esta vacio inicialmente
console.log(instanciaProducto.getProducts());

//Agrego 3 productos para luego poder probar luego con ellos
instanciaProducto.addProduct(
  "producto prueba",
  "Este es un producto de prueba",
  200,
  "Sin Imagen",
  "abc123",
  25
);

instanciaProducto.addProduct(
  "producto prueba 2",
  "Este es un producto de prueba 2",
  200,
  "Sin Imagen",
  "abc1234",
  25
);

instanciaProducto.addProduct(
  "producto prueba 3",
  "Este es un producto de prueba 3",
  200,
  "Sin Imagen",
  "abc12345",
  25
);

//Muestro por consola el array con los 3 productos creados anteriormente
console.log(instanciaProducto.getProducts());

//Intento crear un nuevo producto con el mismo codigo que uno de los anteriores
instanciaProducto.addProduct(
  "producto prueba",
  "Este es un producto de prueba",
  200,
  "Sin Imagen",
  "abc123",
  25
);

//Busco el producto con ID 1 y muestor por consola el mensaje que se ha encontrado
console.log(instanciaProducto.getProductById(1));

//Busco el producto con ID 5 y muestor por consola el mensaje NOT FOUND
console.log(instanciaProducto.getProductById(8));

//Actualizo el producto con ID 1. En este caso paso todos las propiedas, pero podrian ser solo algunas.
instanciaProducto.updateProduct(1, {
  title: "Titulo nuevo",
  description: "Nueva descripcion",
  price: "Nuevo precio",
  thumbnail: "Nuevo thumbnail",
  code: "Nueco Code",
  stock: "Nuevo stock",
});

//Intento Actualizr el producto con ID 1 pero poniendo un nuevo codigo que ya existe y muestro que no es posible.
instanciaProducto.updateProduct(1, {
  title: "Titulo nuevo 2",
  description: "Nueva descripcion2",
  price: "Nuevo precio 2",
  thumbnail: "Nuevo thumbnail 2",
  code: "abc12345",
  stock: "Nuevo stock",
});

//Elimino el producto con ID 2, quedarian los productos con ID 1 y 3
instanciaProducto.deleteProduct(2);

//Intento eliminar un producto con un ID que no existe
instanciaProducto.deleteProduct(8);

//COMO RESULTADO FINAL QUEDAN 2 PRODUCTOS, UNO CON ID 1 QUE FUE ACTUALIZADO Y OTRO CON ID 3 QUE QUEDA ORIGINAL COMO FUE CREADO.
