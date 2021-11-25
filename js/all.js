let data = [];

// get html dom element
const ticketCardArea = document.querySelector('.ticketCard-area');
const regionSearch = document.querySelector('.regionSearch');
const btnAddTicket = document.querySelector('.addTicket-btn');
const formAddTicket = document.querySelector('.addTicket-form');
const searchResultNum = document.querySelector('#searchResult-text');

// for validate
const createTicketName = document.querySelector('#ticketName');
const createTicketImgUrl = document.querySelector('#ticketImgUrl');
const createTicketRegion = document.querySelector('#ticketRegion');
const createTicketPrice = document.querySelector('#ticketPrice');
const createTicketNum = document.querySelector('#ticketNum');
const createTicketRate = document.querySelector('#ticketRate');
const createTicketDescription = document.querySelector('#ticketDescription');
const createTicketBtn = document.querySelector('#addTicketBtn');
const createForm = document.querySelector('#addTicketForm');
const inputs = document.querySelectorAll(
  '#addTicketForm input[type=text],input[type=url],input[type=number],select.ticketRegion,textarea'
);

// validate condition, errorMessage
const constraints = {
  ticketName: {
    presence: {
      message: '必填！',
    },
  },
  ticketImgUrl: {
    presence: {
      message: '必填！',
    },
    url: {
      schemes: ['http', 'https'],
      message: '請填寫正確的網址',
    },
  },
  ticketRegion: {
    presence: {
      message: '必填！',
    },
  },
  ticketPrice: {
    presence: {
      message: '必填！',
    },
    numericality: {
      greaterThan: 0,
      message: '必須大於 0',
    },
  },
  ticketNum: {
    presence: {
      message: '必填！',
    },
    numericality: {
      greaterThan: 0,
      message: '必須大於 0',
    },
  },
  ticketRate: {
    presence: {
      message: '必填',
    },
    numericality: {
      greaterThanOrEqualTo: 1,
      lessThanOrEqualTo: 10,
      message: '必須在 1-10 的區間',
    },
  },
  ticketDescription: {
    presence: {
      message: '必填',
    },
  },
};

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

const dataUrl = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json';

const init = () => {
  axios
    .get(dataUrl)
    .then((res) => {
      // console.log(res);
      data = res.data.data;
      render();
    })
    .catch((err) => {
      console.log(err.response);
    });
};

const render = (payload = data) => {
  ticketCardArea.innerHTML = payload.reduce((pre, cur) => pre + cardInfo(cur), '');
  searchResultNum.innerHTML = `本次搜尋共${payload.length}筆資料`;
};

const addTicket = (e) => {
  const inputData = {
    id: Date.now(),
    name: document.querySelector('#ticketName').value.trim(),
    imgUrl: document.querySelector('#ticketImgUrl').value,
    area: document.querySelector('#ticketRegion').value,
    group: Number(document.querySelector('#ticketNum').value),
    price: Number(document.querySelector('#ticketPrice').value),
    rate: Number(document.querySelector('#ticketRate').value),
    description: document.querySelector('#ticketDescription').value,
  };
  data.push(inputData);
  regionSearch.value = '';
  render(data);
  formAddTicket.reset();

  // 檢查屬性是否有值
  // if (Object.values(inputData).every((v) => !!v)) {
  //   data.push(inputData);

  //   regionSearch.value = '';
  //   render(data);
  //   formAddTicket.reset();
  // } else {
  //   alert('請填寫完整資料');
  //   formAddTicket.reset();
  // }
};

// 驗證表單
function checkInputValue() {
  inputs.forEach(function (item) {
    item.addEventListener('change', function () {
      item.nextElementSibling.textContent = '';
      let errors = validate(createForm, constraints);
      if (errors) {
        let arr = Object.keys(errors);
        arr.forEach(function (key) {
          document.querySelector(`p.${key}`).textContent = errors[key];
        });
      }
    });
  });
}

function btnAddTicketAction() {
  let check = false;
  inputs.forEach((i) => {
    let errors = validate(createForm, constraints);
    // console.log(i);
    console.log(errors);
    if (errors) {
      Object.keys(errors).forEach(function (keys) {
        // console.log(keys);
        // console.log(errors);
        // console.log(errors[keys]);
        document.querySelector(`p.${keys}`).textContent = errors[keys];
      });
      check = false;
    } else {
      check = true;
    }
    checkInputValue();
  });
  if (check) {
    addTicket();
  }
}

const dropDownSelect = (e) => {
  const city = e.target.value;
  selectedCity = data.filter((item) => item.area === city);
  city === '' ? render() : render(selectedCity);
};

btnAddTicket.addEventListener('click', btnAddTicketAction);
regionSearch.addEventListener('change', dropDownSelect);

init();
render();
