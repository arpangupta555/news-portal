const loadAllCategories = async () => {

    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const response = await fetch(url);
    const data = await response.json();
    displaycategory(data.data.news_category)

}

const displaycategory = categories => {
    const categoryContaienr = document.getElementById('all-menu');
    categories.forEach(category => {

        const categoryUl = document.createElement('ul')
        categoryUl.classList.add('nav');
        categoryUl.innerHTML = `<li class="nav-item"> <button onclick="loadAllNews(${category.category_id})" type="button" class="btn">${category.category_name}</button>

        </li>`
        categoryContaienr.appendChild(categoryUl);
    });


}

loadAllCategories();


const loadAllNews = async (categoryId) => {

    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
    const response = await fetch(url);
    const data = await response.json();
    displayAllNews(data.data)

}
loadAllNews();

const displayAllNews = newses => {
    const newsContaienr = document.getElementById('all-news');
    newsContaienr.innerHTML = '';
    for (const news of newses) {

        const newsDiv = document.createElement('div')
        newsDiv.classList.add('card');
        newsDiv.classList.add('mb-3');
        newsDiv.innerHTML = `

        <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">${news.details.slice(0, 200)}...</p>
                            

                                <div class="d-flex justify-content-between mt-4">
                                    <div class="d-flex justify-content-between mt-4">
                                        <img src="${news.author.img}" class="rounded-circle" style="height:50px;">
                                    <div>
                                        <p> ${news.author.name} </p>
                                        <p> ${news.author.published_date} </p>
                                        </div>
                                    </div>
                        
                                    <div class="class="d-flex justify-content-between mt-4 px-3">
                                       <i class="fa-regular fa-eye">  </i>
                                      <h> ${news.total_view}</h>
                                      
                                      
                                    </div>
                                
                                <div>
                                
                                    <i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>
                                </div>
                                <div>
                                
                                <button onclick="loadNewsDetails(${news._id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                See More
                            </button>
                    
                                 </div>



                            </div>
                        </div>
                    </div>
                </div>
    `
        newsContaienr.appendChild(newsDiv);
    };



};

const loadNewsDetails = async (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    const response = await fetch(url);
    const data = await response.json();
    displayNewsDetails(data.data)
}

const displayNewsDetails = newsDetails => {
    const newsContaienr = document.getElementById('exampleModal');
    newsDetails.forEach(newsDetail => {

        const newsDetailsDiv = document.createElement('div')
        newsDetailsDiv.classList.add('modal-dialog');
        newsDetailsDiv.innerHTML = `
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${newsDetail.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <img src="${newsDetail.image_url}" class="img-fluid rounded-start" alt="...">
            <p>${newsDetail.details} </p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

        </div>
    </div>

        `
        newsContaienr.appendChild(newsDetailsDiv);

    });


}


// https://openapi.programming-hero.com/api/news/0${newsId}`