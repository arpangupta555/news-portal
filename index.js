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

const displayAllNews = newses => {
    const newsContaienr = document.getElementById('all-news');
    newsContaienr.innerHTML = '';
    for (const news of newses) {
        console.log(news)
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
                                
                                <button type="button" class="btn btn-primary">Show More</button>
                    
                                 </div>



                            </div>
                        </div>
                    </div>
                </div>
    `
        newsContaienr.appendChild(newsDiv);
    };



};




loadAllNews();