/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 *
 */
//分页功能
// 假设新闻数据存储在 localStorage 的 'newsData' 键中

let currentPage = 1;
const newsPerPage = 3;  // 每页显示的新闻数量
let newsData = JSON.parse(localStorage.getItem('articles')) || [];
function renderNews() {
    newsData = JSON.parse(localStorage.getItem('articles')) || [];
    const startIndex = (currentPage - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;
    const newsToShow = newsData.slice(startIndex, endIndex);

    const newsListElement = document.querySelector('.news-list');
    newsListElement.innerHTML = '';  // 清空现有新闻

    newsToShow.forEach((newsData, index) => {
        const row = document.createElement('tr');
        const globalIndex = startIndex + index;
        row.innerHTML = `
             <td><img src="${newsData.img}" alt=""></td>
            <td>${newsData.title}</td>
            <td><span>${new Date(newsData.timestamp).toLocaleString()}</span></td>
            <td><span class="view-count">0</span></td>
    <td> <button class="view-button" data-index="${globalIndex}">查看</button></td>

        `;
        newsListElement.appendChild(row);
    });

    // 更新页码显示
    document.getElementById('pageNumber').textContent = ` ${currentPage} `;
}

document.getElementById('prevPage').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        renderNews();
    }
});

document.getElementById('nextPage').addEventListener('click', function () {
    const maxPage = Math.ceil(newsData.length / newsPerPage);
    if (currentPage < maxPage) {
        currentPage++;
        renderNews();
    }
});



document.querySelector('.news-list').addEventListener('click', function (event) {
    if (event.target.classList.contains('view-button')) {
        // 获取点击的新闻的索引或ID
        const newsIndex = event.target.getAttribute('data-index');
        console.log(newsIndex);
        const newsCard = event.target.closest('.cards'); // 请根据您的实际HTML结构调整这个选择器

        if (newsCard) {
            newsCard.style.display = 'none';
            showNewsContent(newsIndex);
        }
        // 更新查看次数
        const viewCountElement = event.target.parentElement.parentElement.querySelector('.view-count');
        viewCountElement.textContent = parseInt(viewCountElement.textContent) + 1;
    }
});
function showNewsContent(index) {
    // 假设 newsData 是包含所有新闻数据的数组
    const newsData = JSON.parse(localStorage.getItem('articles')) || [];
    const newsItem = newsData[index];
    const newsContentContainer = document.getElementById('news-content');

    // 设置新闻内容
    newsContentContainer.innerHTML = `
    <div class='news'>
     <span id="back-arrow">← 返回</span>
        <h1 class="news-title">${newsItem.title}</h1>
        <p class="time">发布时间：${new Date(newsItem.timestamp).toLocaleString()}</p>
        <p class="news-text">${newsItem.text}</p>
       </div>
    `;

    // 显示新闻详细内容容器
    newsContentContainer.style.display = 'block';

    // 为返回箭头添加点击事件，返回新闻列表
    document.getElementById('back-arrow').addEventListener('click', function () {
        // 隐藏新闻详细内容容器
        newsContentContainer.style.display = 'none';

        // 显示之前隐藏的新闻卡片
        // 这里需要有一个引用指向新闻卡片的元素
        document.querySelector('.cards').style.display = 'block';

    });
}
// document.querySelector('.news-list').addEventListener('click', function (event) {
//     if (event.target.classList.contains('view-button')) {
//         const newsIndex = event.target.getAttribute('data-index');
//         const newsCard = event.target.closest('.card'); // 根据实际HTML结构调整
//         const newsDetail = document.getElementById('news-detail');
//         const backButton = newsDetail.querySelector('.back-button'); // 假设您有一个返回按钮

//         // 隐藏新闻卡片
//         if (newsCard) {
//             newsCard.style.display = 'none';
//         }

//         // 显示并填充新闻详情
//         const newsData = JSON.parse(localStorage.getItem('articles')) || [];
//         const newsItem = newsData[newsIndex];
//         newsDetail.innerHTML = `
//             <div class="news-content">
//                 <h1>${newsItem.title}</h1>
//                 <p>${newsItem.content}</p>
//                 <span class="back-button">← 返回</span>
//             </div>
//         `;

//         // 显示新闻详情区域
//         newsDetail.style.display = 'block';

//         // 绑定返回按钮事件
//         backButton.addEventListener('click', function () {
//             newsDetail.style.display = 'none'; // 隐藏新闻详情
//             newsCard.style.display = ''; // 重新显示新闻卡片
//             newsDetail.innerHTML = ''; // 清除新闻详情内容
//         });
//     }
// });
// 加载并渲染图书列表
function loadBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const tbody = document.querySelector('.list');
    tbody.innerHTML = '';
    books.forEach((book, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${book.bookname}</td>
                <td>${book.author}</td>
                <td>${book.publisher}</td>
                <td data-id=${book.id}>
                    <span class="del">删除</span>
                    <span class="edit">编辑</span>
                </td>
            </tr>
        `;
    });
}

// 添加新图书
function addNewBook() {
    const bookname = document.querySelector('.add-form .bookname').value;
    const author = document.querySelector('.add-form .author').value;
    const publisher = document.querySelector('.add-form .publisher').value;

    const newBook = { bookname, author, publisher, id: Date.now() };
    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(newBook);

    localStorage.setItem('books', JSON.stringify(books));
    loadBooks();

    document.querySelector('.add-form').reset();
}

// 删除图书
function deleteBook(bookId) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books = books.filter(book => book.id.toString() !== bookId);
    localStorage.setItem('books', JSON.stringify(books));
    loadBooks();
}

// ... 其他代码 ...

// 编辑元素绑定事件
document.querySelector(".list").addEventListener("click", e => {
    if (e.target.classList.contains('edit')) {
        // 获取用户当前数据
        const row = e.target.closest('tr');
        const id = row.querySelector('td[data-id]').getAttribute('data-id');
        const bookname = row.cells[1].textContent;
        const author = row.cells[2].textContent;
        const publisher = row.cells[3].textContent;

        // 填充到编辑表单
        const editForm = document.querySelector('.edit-form');
        editForm.querySelector('.id').value = id;
        editForm.querySelector('.bookname').value = bookname;
        editForm.querySelector('.author').value = author;
        editForm.querySelector('.publisher').value = publisher;

        // 显示编辑模态框
        editModal.show();
    }
});

// 修改按钮->点击->更新数据
document.querySelector('.edit-btn').addEventListener('click', () => {
    // 获取修改后的数据
    const editForm = document.querySelector('.edit-form');
    const updatedData = {
        id: editForm.querySelector('.id').value,
        bookname: editForm.querySelector('.bookname').value,
        author: editForm.querySelector('.author').value,
        publisher: editForm.querySelector('.publisher').value
    };

    // 更新本地存储中的数据
    updateBookData(updatedData);

    // 隐藏编辑模态框
    editModal.hide();
});

// 更新图书数据
function updateBookData(updatedData) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    const bookIndex = books.findIndex(book => book.id.toString() === updatedData.id);
    if (bookIndex !== -1) {
        books[bookIndex] = updatedData;
        localStorage.setItem('books', JSON.stringify(books));
        loadBooks(); // 重新加载并渲染图书列表
    }
}

var a = '';
// 创建弹窗对象
const addModalDom = document.querySelector(".add-modal");
const addModal = new bootstrap.Modal(addModalDom);

const editModalDom = document.querySelector(".edit-modal");
const editModal = new bootstrap.Modal(editModalDom);
document.querySelector(".img-file").addEventListener("change", async e => {
    const file = e.target.files[0]
    const fd = new FormData()
    fd.append('image', file)
    //单独上传图片并得到图片 URL 网址
    const res = await axios({
        url: 'http://geek.itheima.net/v1_0/upload',
        method: 'POST',
        data: fd
    })
    console.log(res);
    //回显并切换 img 标签展示（隐藏 + 号上传标签）
    const imgUrl = res.data.data.url
    console.log(imgUrl);
    document.querySelector(".rounded").src = imgUrl
    document.querySelector(".rounded").classList.add("show")
    document.querySelector(".place").classList.add('hide')
    a = imgUrl;
    console.log(a);


})
//优化   点击img  可以重新切换封面
//思路    img 点击   用js的方式触发文件选择元素click事件方法
document.querySelector(".rounded").addEventListener("click", () => {
    document.querySelector(".img-file").click()
})
document.getElementById('publishButton').addEventListener('click', function (event) {
    event.preventDefault();//阻止默认事件
    var isEditing = this.getAttribute('data-editing') === 'true';
    var editingIndex = parseInt(this.getAttribute('data-editing-index'));
    var formData = {
        title: document.getElementById('title').value,
        channel_id: document.getElementById('channel_id').value,
        img: a,
        text: document.getElementById('text').value,
        timestamp: new Date().getTime() // 添加时间戳
    };
    const form = document.querySelector(".art-form")
    var articles = JSON.parse(localStorage.getItem('articles')) || [];
    if (isEditing) {
        // 更新现有文章
        articles[editingIndex] = formData;
    } else {
        // 添加新文章
        articles.push(formData);
    }

    localStorage.setItem('articles', JSON.stringify(articles));
    setTimeout(() => {
        // $(".tab ul").eq(8).addClass("current").siblings().removeClass("current");

        $("#contentManagement").addClass('current').siblings().removeClass('current')
        //3.让下面相对应的item显示  其余隐藏
        $(".tab_con .item").eq(8).show().siblings().hide();
    }, 1500)
    renderArticles(); // 重新渲染所有文章
    renderNews();

    form.reset();
    //封面需要手动重置
    document.querySelector(".rounded").src = ''
    document.querySelector(".rounded").classList.remove("show")
    document.querySelector(".place").classList.remove('hide')
    // 重置按钮状态和文本
    this.innerText = '发布';
    this.removeAttribute('data-editing');
    this.removeAttribute('data-editing-index');

});


function renderArticles() {
    var artList = document.querySelector('.art-list');
    artList.innerHTML = ''; // 清空现有内容

    var articles = JSON.parse(localStorage.getItem('articles')) || [];
    articles.forEach(function (data, index) {
        var newRow = document.createElement('tr');
        console.log(data);
        newRow.innerHTML = `
            <td><img src="${data.img}" alt=""></td>
            <td>${data.title}</td>
            <td><span class="badge text-bg-success">审核通过</span></td>
            <td><span>${new Date(data.timestamp).toLocaleString()}</span></td>
            <td><span>0</span></td>
            <td><span>0</span></td>
            <td><span>0</span></td>
            <td>
                <i class="edit" onclick="editArticle(${index})">编辑</i>
                <i class="del" onclick="deleteArticle(${index})">删除</i>
            </td>
        `;
        artList.appendChild(newRow);
    });
}

// function rendernewslist() {
//     var newsList = document.querySelector('.news-list');
//     newsList.innerHTML = ''; // 清空现有内容

//     var news = JSON.parse(localStorage.getItem('articles')) || [];
//     news.forEach(function (data, index) {
//         var newsRow = document.createElement('tr');
//         console.log(data);
//         newsRow.innerHTML = `
//             <td><img src="${data.img}" alt=""></td>
//             <td>${data.title}</td>
//             <td><span>${new Date(data.timestamp).toLocaleString()}</span></td>
//             <td><span>0</span></td>
//             <td><span>0</span></td>
//             <td><span>0</span></td>

//         `;
//         newsList.appendChild(newsRow);
//     });

//     // 更新新闻项列表
//     newsItems = newsList.querySelectorAll('tr');
//     totalPages = Math.ceil(newsItems.length / newsPerPage);

//     // 重新渲染当前页的新闻
//     renderNews(currentPage);
// };

function editArticle(index) {
    var articles = JSON.parse(localStorage.getItem('articles')) || [];
    var article = articles[index];
    $("#fabu").addClass('current').siblings().removeClass('current')
    //3.让下面相对应的item显示  其余隐藏
    $(".tab_con .item").eq(9).show().siblings().hide();
    // 回显数据到表单
    document.getElementById('title').value = article.title;
    document.getElementById('channel_id').value = article.channel_id;

    document.querySelector(".rounded").src = a;
    document.querySelector(".rounded").classList.add("show")
    document.querySelector(".place").classList.add('hide')
    document.getElementById('text').value = article.text;

    // 更改发布按钮的文字为"修改"
    document.getElementById('publishButton').innerText = '修改';

    // 可以设置一个标记来指示当前是编辑模式
    document.getElementById('publishButton').setAttribute('data-editing', 'true');
    document.getElementById('publishButton').setAttribute('data-editing-index', index);

}

function deleteArticle(index) {
    var articles = JSON.parse(localStorage.getItem('articles')) || [];
    articles.splice(index, 1); // 删除指定索引的文章
    localStorage.setItem('articles', JSON.stringify(articles));
    renderArticles(); // 重新渲染文章列表
    renderNews();
}

document.addEventListener('DOMContentLoaded', function () {
    renderArticles();
    renderNews();
    // 其他初始化代码...
    // 初始化图书列表
    // 初始化渲染新闻列表

    loadBooks();

    // 为添加按钮添加点击事件监听器
    const addBtn = document.querySelector('.add-btn');
    addBtn.addEventListener('click', () => {
        addNewBook();
        addModal.hide();
    });

    // 为删除和编辑按钮添加事件监听器
    const list = document.querySelector('.list');
    list.addEventListener('click', e => {
        if (e.target.classList.contains('del')) {
            // 处理删除逻辑
            deleteBook(e.target.parentElement.getAttribute('data-id'));
        } else if (e.target.classList.contains('edit')) {
            // 处理编辑逻辑
            const bookId = e.target.parentElement.getAttribute('data-id');
            editBook(bookId);
        }
    });
});
document.getElementById('items').addEventListener('click', function () {
    // 隐藏新闻详细内容容器
    const tab = document.querySelector('.tab');
    tab.style.display = 'none';

    // 显示之前隐藏的新闻卡片
    // 这里需要有一个引用指向新闻卡片的元素
    document.querySelector('.items').style.display = 'block';
});
document.getElementById('back').addEventListener('click', function () {
    // 隐藏新闻详细内容容器
    const tab = document.querySelector('.tab');
    tab.style.display = 'block';

    // 显示之前隐藏的新闻卡片
    // 这里需要有一个引用指向新闻卡片的元素
    document.querySelector('.items').style.display = 'none';
});