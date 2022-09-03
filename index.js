const loadAllCategories = async () => {

    const url = `https://openapi.programming-hero.com/api/news/categories`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displaycategory(data.data.news_category)
    }
    catch (error) {
        console.log(error);
    }



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




const loadAllNews = async (categoryId) => {

    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`;


    toggleSpinner(true);

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayAllNews(data.data);


    }
    catch (error) {
        console.log(error);
    }



}


const displayAllNews = newses => {
    const newsContainer = document.getElementById('all-news');
    newsContainer.innerHTML = '';
    const foundItems = document.getElementById('found-items');
    foundItems.innerText = newses.length + `  Items found in this catagory`;

    const noNewsFound = document.getElementById('no-news-found');
    if (newses.length === 0) {
        noNewsFound.classList.remove('d-none')

    }
    else {
        noNewsFound.classList.add('d-none')
    }

    for (const news of newses) {

        const newsDiv = document.createElement('div')
        newsDiv.classList.add('card');
        newsDiv.classList.add('mb-3');
        newsDiv.innerHTML = `

        <div onclick= "loadNewsDetails('${news._id ? news._id : "No Data Avilable"}')" class="row g-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <div class="col-md-4">
                        <img src="${news.image_url ? news.image_url : "No Data Avilable"}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${news.title ? news.title : "No Data Avilable"}</h5>
                            <p class="card-text">${news.details.slice(0, 200)}...</p>
                            

                                <div class="d-flex justify-content-between mt-4">
                                    <div class="d-flex justify-content-between mt-4">
                                        <img src="${news.author.img ? news.author.img : "No Data Avilable"}" class="rounded-circle" style="height:50px;">
                                    <div>
                                        <p> ${news.author.name ? news.author.name : "No Data Avilable"} </p>
                                        <p> ${news.author.published_date ? news.author.published_date : "No Data Avilable"} </p>
                                        </div>
                                    </div>
                        
                                    <div class="class="d-flex justify-content-between mt-4 px-3">
                                       <i class="fa-regular fa-eye">  </i>
                                      <h> ${news.total_view ? news.author.published_date : "No Data Avilable"}</h>
                                      
                                      
                                    </div>
                                
                                <div>
                                
                                    <i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>
                                </div>
                                <div>
                                
                                <button  type="button" class="btn btn-primary" >
                                See More
                            </button>
                    
                                 </div>



                            </div>
                        </div>
                    </div>
                </div>
    `



        newsContainer.appendChild(newsDiv);
    }

    toggleSpinner(false);

}

const loadNewsDetails = async (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;


    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNewsDetails(data.data)
    }
    catch (error) {
        console.log(error);
    }




}

const displayNewsDetails = newsDetails => {
    const newsContaienr = document.getElementById('exampleModal');


    newsDetails.forEach(newsDetail => {

        newsContaienr.innerHTML = '';
        const newsDetailsDiv = document.createElement('div')
        newsDetailsDiv.classList.add('modal-dialog');
        newsDetailsDiv.innerHTML = `
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${newsDetail.title ? newsDetail.title : "No Data Avilable"}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <img src="${newsDetail.image_url ? newsDetail.image_url : "No Data Avilable"}" class="img-fluid rounded-start" alt="...">
                <p>${newsDetail.details ? newsDetail.details : "No Data Avilable"} </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

            </div>
        </div>

            `
        newsContaienr.appendChild(newsDetailsDiv);

    });


}



const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}


loadAllCategories();