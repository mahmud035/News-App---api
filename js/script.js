'use strict';

const loadNewsData = async () => {
  const url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=b69d605d5573446b8d045934f02160ab`;

  const res = await fetch(url);
  const data = await res.json();
  return data.articles;
};

const displayFirstNews = async () => {
  const allNews = await loadNewsData();
  const firstNews = allNews[0];
  // console.log(firstNews);

  const firstNewsObject = JSON.stringify(firstNews);
  const { urlToImage, title, content, publishedAt } = firstNews;

  const firstNewsContainer = document.getElementById('first-news-container');

  const firstNewsCard = document.createElement('div');
  firstNewsCard.classList.add('card', 'mb-3', 'mx-auto', 'border-0');
  firstNewsCard.innerHTML = `
        <div class="row g-0" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='displayNewsDetails(${firstNewsObject})'>
          <div class="col-md-6">
            <img
              src="${urlToImage}"
              class="img-fluid "
              alt="..."
            />
          </div>
          <div class="col-md-6">
            <div class="card-body ps-0 ps-md-3 pt-md-0">
              <h5 class="card-title">
                ${title}
              </h5>
              <p class="card-text">
                ${content ? content.slice(0, 100) : 'Not Available'}
              </p>
              <p class="card-text">
                <small class="text-muted">${getDate(publishedAt)}</small>
              </p>
            </div>
          </div>
        </div>
    `;

  firstNewsContainer.appendChild(firstNewsCard);
};

displayFirstNews();

const displayRemainingNews = async () => {
  const allNews = await loadNewsData();
  const remainingNews = allNews.slice(1, 50);
  // console.log(remainingNews)

  const remainingNewsContainer = document.getElementById(
    'remaining-news-container'
  );

  remainingNews.forEach((news) => {
    // console.log(news);
    const { urlToImage, title, content, publishedAt } = news;
    const newsObject = JSON.stringify(news);

    const newsDiv = document.createElement('div');
    newsDiv.classList.add('col', 'pe-1');
    newsDiv.innerHTML = `
      <div data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='displayNewsDetails(${newsObject})'>
         <div class="card mb-3 h-100 border-0" >
            <div class="row g-0">
              <div class="col-4 col-lg-12">
                  <img src="${urlToImage}" class="img-fluid " alt="..."/>
              </div>
              <div class="col-8 col-lg-12">
                <div class="card-body ps-lg-0 pt-0 pt-lg-3">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text d-none d-md-block d-lg-none">
                    ${content ? content.slice(0, 100) : 'Not Available'}
                  </p>
                  <p class="card-text">
                    <small class="text-muted">${getDate(publishedAt)}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>
       
    `;

    remainingNewsContainer.appendChild(newsDiv);
  });
};

displayRemainingNews();

const displayNewsDetails = (news) => {
  const { urlToImage, title, content, publishedAt } = news;
  console.log(news);

  const newsTitle = document.getElementById('news-title');
  newsTitle.innerText = title;

  const modalBody = document.getElementById('modal-body');
  modalBody.textContent = '';

  const newsCard = document.createElement('div');
  newsCard.classList.add(
    'card',
    'mb-3',
    'p-3',
    'border-0',
    'rounded',
    'shadow-sm',
    'news-details-card',
    'mx-auto'
  );
  newsCard.innerHTML = `
         <img src="${urlToImage}" class="card-img-top " alt="..." />
         <div class="card-body pb-0">
              <h5 class="card-title py-3">${title}</h5>
              <p class="card-text text-muted">
                ${content}
              </p>
               <p class="card-text">
                  <small class="text-muted">${getDate(publishedAt)}</small>
               </p>

              
         </div>
    `;
  modalBody.appendChild(newsCard);
};

const getDate = (publishedAt) => {
  const date = new Date(publishedAt);
  const sortDate = date.toString().slice(4, 15);
  return sortDate;
};
