let data = [
  {
    id: 0,
    name: '肥宅心碎賞櫻3日',
    imgUrl:
      'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80',
    area: '高雄',
    description: '賞櫻花最佳去處。肥宅不得不去的超讚景點！',
    group: 87,
    price: 1400,
    rate: 10,
  },
  {
    id: 1,
    name: '貓空纜車雙程票',
    imgUrl:
      'https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    area: '台北',
    description: '乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感',
    group: 99,
    price: 240,
    rate: 2,
  },
  {
    id: 2,
    name: '台中谷關溫泉會1日',
    imgUrl:
      'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    area: '台中',
    description:
      '全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。',
    group: 20,
    price: 1765,
    rate: 7,
  },
];

// get html dom element
const ticketCardArea = document.querySelector('.ticketCard-area');
const regionSearch = document.querySelector('.regionSearch');
const btnAddTicket = document.querySelector('.addTicket-btn');
const formAddTicket = document.querySelector('.addTicket-form');

const cardInfo = (places) => {
  return `
    <li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img src="${places.imgUrl}" alt="圖片">
          </a>
          <div class="ticketCard-region">${places.area}</div>
          <div class="ticketCard-rank">${places.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${places.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${places.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num"> ${places.group} </span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${places.price}</span>
            </p>
          </div>
        </div>
      </li>
  `;
};

const render = (payload = data) => {
  ticketCardArea.innerHTML = payload.reduce((pre, cur) => pre + cardInfo(cur), '');
};

const addTicket = (e) => {
  // e.preventDefault();
  // console.log(e.path[1]);
  const inputData = {
    name: document.querySelector('#ticketName').value.trim(),
    imgUrl: document.querySelector('#ticketImgUrl'),
    area: document.querySelector('#ticketRegion'),
    productDescription: document.querySelector('#ticketDescription'),
    productAmount: document.querySelector('#ticketNum'),
    ticketPrice: document.querySelector('#ticketPrice'),
    productRate: document.querySelector('#ticketRate'),
  };
  console.log(inputData);

  const objAdd = {
    id: Date.now(),
  };

  inputData.forEach((item) => {
    objAdd[item['name']] = item.value.trim();
  });

  objAdd.group = Number(objAdd.group);
  objAdd.price = Number(objAdd.price);
  objAdd.rate = Number(objAdd.rate);

  data.push(objAdd);

  regionSearch.value = '';
  // render(data);
  formAddTicket.reset();
};

const dropDownSelect = () => {};

btnAddTicket.addEventListener('click', addTicket);
regionSearch.addEventListener('change', dropDownSelect);

render();
