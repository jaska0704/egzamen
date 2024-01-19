const baceUrl = "http://localhost:3000/products";
const baceUrl1 = "http://localhost:3000/card3";
localStorage.getItem("sum");
let barCard = document.querySelector(".bar_card");
let category = document.querySelector(".category");
let productCards = document.querySelector(".product-cards");
let input = document.querySelector("input");
let cart_number = document.querySelector(".cart_number");
let btnCard = document.querySelector("#btnCard");
let sum = 0;

let massivData = [];

const getAllCategory = async () => {
  try {
    const res = await fetch(baceUrl);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
const get3Category = async () => {
  try {
    const res = await fetch(baceUrl1);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
const getSingleCategory = async (id) => {
  try {
    const res = await fetch(`${baceUrl}/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const renderCard = async (id) => {
  const data = await get3Category();

  barCard.innerHTML = data
    ?.map((item) => {
      return ` <div class="bar-cardMini sm:hidden xl:inline-block md:w-[53%] h-[360px] p-5 bg-[#ffffff] rounded-lg">
    <h3>${item.title}</h3>
    <img class="ml-14 w-[60%] h-[220px]" src=${item.img} alt="">
    <div class="flex gap-2 items-center">
    <p class="cart_price text-[#9098B1] line-through leading-[27px] text-lg">$${
      item.price * 0.24 + item.price
    }</p><span class="sale font-bold text-lg leading-[27px] text-[#FB7181]">24% Off</span>
    </div>
    <p class="cart_sale_price text-3xl text-[#40BFFF] font-bold leading-[54px] text-right">$${
      item.price
    }</p>
    </div>`;
    })
    .join("");
};
renderCard();

const renderProducts = async (id) => {
  const buttons = document.querySelectorAll(".category > button");
  for (let i of buttons) {
    i.classList.remove("actiV");
  }
  buttons.forEach((item) => {
    if (item.dataset.category == id) {
      item.classList.add("actiV");
    }
  });
  const data = await getSingleCategory(id);
  console.log(data);
  massivData = [...data.product];
  productCards.innerHTML = data?.product
    ?.map((item) => {
      return `<div  class="product-card bg-white mt-10 w-[90%] sm:ml-5 rounded-lg text-center shadow-slate-500">
                <img class="w-[200px] h-[200px] ml-3 hover:opacity-15 pt-2" src=${
                  item.img
                }>
                <p class="text-lg font-bold leading-7 text-[#223263]">${
                  item.title
                }</p>
                <img class="inline-block" src="/images/rate.png" alt=""><br>
                <div class="flex justify-evenly items-center">
                    <div>
                        <button data-card  class="bg-green-300 w-6 rounded"><i data-card class="fa-solid fa-cart-shopping" style="color: red;"></i></button>
                    </div>
                    <div>
                        <span>$${item.price}</span>
                        <span class="text-[#9098B1] line-through leading-[21px] text-sm font-normal">$${
                          item.price * 0.25 + item.price
                        }<span>
                        <p class="text-[#FB7181] font-bold text-sm">24%Off</p></a>
                    </div>
                    <div>
                        <a href="http://127.0.0.1:5500/pages/card.html?idd=${
                          data.id
                        }?id=${
        item?.id
      }"><button class="btnCard  bg-green-300 w-6 rounded"><i class="fa-solid fa-info" style="color: red;"></i></button></a>
                    </div>
                </div>
                </div>`;
    })
    .join("");
  };

  window.addEventListener("click", function (e){
    if(e.target.hasAttribute("data-card")){
      cart_number.innerHTML = ++sum;
      localStorage.setItem("sum", sum);

    };
  });

const categoryProduct = async () => {
  const data = await getAllCategory();
  category.innerHTML = data
    ?.map(
      (item) => `
            <button  data-category="${item.id}"
              class="sm:text-[10px] sm:text-[#9098B1] md:text-[22px] font-normal uppercase">
            ${item.category}
            </button>`
    )
    .join("");
  renderProducts(data[0]?.id);
};
categoryProduct();

category.addEventListener("click", (e) => {
  let id = e.target.dataset.category;
  if (id) {
    renderProducts(id);
  }
});

input.addEventListener("keyup", (e) => {
  productCards.innerHTML = massivData
    ?.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    )
    ?.map(
      (
        item
      ) => `<div class="product-card bg-white mt-10 w-[90%] rounded-lg text-center">
                <img class="w-[90%] h-[250px] ml-3 hover:opacity-5 pt-2" src=${
                  item.img
                }>
                <p class="text-lg font-bold leading-7 text-[#223263]">${
                  item.title
                }</p>
                <img class="inline-block" src="/images/rate.png" alt="">
                <div class="flex justify-evenly items-center">
                    <div>
                        <button data-card  class="bg-green-300 w-6 rounded"><i data-card class="fa-solid fa-cart-shopping" style="color: red;"></i></button>
                    </div>
                    <div>
                        <span>$${item.price}</span>
                        <span class="text-[#9098B1] line-through leading-[21px] text-sm font-normal">$${
                          item.price * 0.25 + item.price
                        }<span>
                        <p class="text-[#FB7181] font-bold text-sm">24%Off</p></a>
                    </div>
                    <div>
                        <a href="http://127.0.0.1:5500/pages/card.html?idd=${
                          massivData.id
                        }?id=${
        item?.id
      }"><button class="btnCard  bg-green-300 w-6 rounded"><i class="fa-solid fa-info" style="color: red;"></i></button></a>
                    </div>
                </div>
            </div>`
    )
    .join("");
});


