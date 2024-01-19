let params = new URLSearchParams(document.location.search);
let id =params.get("idd");
let num =Number(id.slice(5.6))

const baseUrl = "http://localhost:3000/products";

let mainBox = document.querySelector("#main-box");
let header = document.querySelector(".header");
let btn = document.querySelector("button");

// btn.addEventListener("click", () => {
//   body.classList.toggle("dark");
//   header.classList.toggle("dark");
//   btn.classList.toggle("dark");
// });

const renderCard = (id) => {
  console.log(id);
  mainBox.innerHTML =`
         <div class="box1 w-1/2">
        <img class="w-[400px]" src=${id.img} alt="" />
      </div>
      <div class="box2 w-1/2">
        <div class="flex justify-center items-center">
          <div class="w-1/2">
            <h1 class="text-red-600 text-3xl">${id.title}</h1>
            <p class="inline-block text-base font-semibold mr-5 mt-5">Native Name:</p>
            <span class="text-base font-light text-slate-500">${id.title}</span> <br />
            <p class="inline-block text-base font-semibold mr-5 mt-5">Population:</p>
            <span class="text-base font-light text-slate-500">${id.title}</span> <br />
            <p class="inline-block text-base font-semibold mr-5 mt-5">Region:</p>
            <span class="text-base font-light text-slate-500">${id.title}</span> <br />
            <p class="inline-block text-base font-semibold mr-5 mt-5">Sub Region:</p>
            <span class="text-base font-light text-slate-500">Western ${id.title}</span> <br />
            <p class="inline-block text-base font-semibold mr-5 mt-5">Capital:</p>
            <span class="text-base font-light text-slate-500">${id.title}</span> <br />
          </div>
          <div class="w-1/2">
            <p class="inline-block mr-5 mt-5">Top Level Domain:</p><span>be</span><br>
            <p class="inline-block mr-5 mt-5">Currencies:</p><span>Euro</span><br>
            <p class="inline-block mr-5 mt-5">Lang:</p><span class="inline-block ">Dutch, French, German</span>
          </div>
        </div>
        <div>
            
        </div>
      </div>`;
  ;
//   localStorage.setItem("products", JSON.stringify(oldProducts));
//   item_count.textContent = oldProducts.reduce((a, b) => b.userCount + a, 0);
};
const renderProductDetail = async () => {
  try {
    const res = await fetch(`${baseUrl}/${id}`);
    let product = await res.json();
    renderCard(product.product[num-1]);
  } catch (error) {}
};
renderProductDetail();

