// Lắng nghe sự kiện click cho tất cả các button có class "editUserButton"
document.addEventListener('click', function (event) {
    if (
        event.target.classList.contains('BanUserButton') ||
        (event.target.classList.contains('fas') &&
            event.target.parentElement.classList.contains('BanUserButton'))
    ) {
        const userId = event.target.id || event.target.parentElement.id;
        const button = event.target.closest('.BanUserButton');

        // Fetch dữ liệu user theo ID
        fetch(`/api/banReportById/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.EC == 0) {
                    $(document).ready(function () {
                        $('.toast .toast-body').html('Ban report success !');
                        $('.toast').toast('show');
                        button.classList.remove('BanUserButton');
                        button.classList.add('UnBanUserButton');
                        $(button).html('<i class="fa fa-unlock" aria-hidden="true"></i>');
                    });
                } else {
                    $('.toast .toast-body').html('Ban report failed !');
                        $('.toast').toast('show');
                }

                // ...
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu:', error);
            });
    }
    if (
        event.target.classList.contains('UnBanUserButton') ||
        (event.target.classList.contains('fa') &&
            event.target.parentElement.classList.contains('UnBanUserButton'))
    ) {

        const button = event.target.closest('.UnBanUserButton');
        const userId = event.target.id || event.target.parentElement.id;

        // Fetch dữ liệu user theo ID
        fetch(`/api/unbanReportById/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.EC == 0) {
                    $(document).ready(function () {
                        $('.toast .toast-body').html('Unban report success !');
                        $('.toast').toast('show');
                        button.classList.remove('UnBanUserButton');
                        button.classList.add('BanUserButton');
                        $(button).html('<i class="fas fa-times-circle"></i>');
                    });
                } else {
                    $('.toast .toast-body').html('Ban report failed !');
                        $('.toast').toast('show');
                }

                // ...
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu:', error);
            });
    }
    if (event.target.classList.contains('img_mess')) {
      
        $('#myimage').attr('src', event.target.src);
        magnify("myimage", 3);
        
    }
});
//zoom img 
function magnify(imgID, zoom) {
    let img, glass, w, h, bw;
    img = document.getElementById(imgID);
  
    /* Create magnifier glass: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");
  
    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);
  
    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
  
    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
  
    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
      let pos, x, y;
      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();
      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /* Prevent the magnifier glass from being positioned outside the image: */
      if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
      if (x < w / zoom) {x = w / zoom;}
      if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
      if (y < h / zoom) {y = h / zoom;}
      /* Set the position of the magnifier glass: */
      glass.style.left = (x - w) + "px";
      glass.style.top = (y - h) + "px";
      /* Display what the magnifier glass "sees": */
      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }
  
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
}

// Hàm tạo pagination
let currentPage = 1;
function createPagination() {
    $('#pagination').empty(); // Xóa pagination hiện tại
 
    // Thêm nút "Previous"
    if (currentPage > 1) {
        $('.pagination').append(
            '<li class="page-item"><a class="page-link" href="#" data-page="' +
                (currentPage - 1) +
                '">Previous</a></li>',
        );
    } else {
        $('.pagination').append(
            '<li class="page-item disabled"><a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a></li>',
        );
    }

    // Thêm các nút trang
    for (var i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            $('.pagination').append(
                `<li class="page-item active"><a class="page-link" href="http://localhost:8000/user/${i}" data-page="` +
                    i +
                    '">' +
                    i +
                    '</a></li>',
            );
        } else {
            $('.pagination').append(
                `<li class="page-item"><a class="page-link" href="http://localhost:8000/user/${i}" data-page="` +
                    i +
                    '">' +
                    i +
                    '</a></li>',
            );
        }
    }
  

    // Thêm nút "Next"
    if (currentPage < totalPages) {
        $('.pagination').append(
            '<li class="page-item"><a class="page-link" href="#" data-page="' +
                (currentPage + 1) +
                '">Next</a></li>',
        );
    } else {
        $('.pagination').append(
            '<li class="page-item disabled"><a class="page-link" href="#" tabindex="-1" aria-disabled="true">Next</a></li>',
        );
    }
}

// Xử lý sự kiện khi người dùng click vào nút chuyển trang
$('#pagination').on('click', '.page-link', function (e) {
    e.preventDefault();
    const page = $(this).data('page');
    currentPage = page;
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = `    <td colspan="6">
                    <div class="d-flex justify-content-center form-loading" style="width:100%">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div></td>`;
    fetch(`/api/getReport/${page}`)
        .then((response) => {
            // Xử lý phản hồi từ server
            if (response.ok) {
                return response.json(); // Giả sử server trả về dữ liệu JSON
            } else {
                // Xử lý lỗi
                throw new Error('Lỗi khi fetch dữ liệu');
            }
        })
        .then((data) => {
            // Hiển thị dữ liệu trên trang web
     
            totalPages = data.totalPages;
            renderUsersTable(data);
            createPagination();
            // ... Xử lý dữ liệu nhận được từ server
        })
        .catch((error) => {
            // Xử lý lỗi
            console.error('Lỗi:', error);
        });
    $(this).parent().addClass('active').siblings().removeClass('active');
});
function renderUsersTable(users) {

    
    // Lấy phần tử bảng HTML
    const tableBody = document.querySelector('tbody');

    // Xóa nội dung hiện tại của bảng
    tableBody.innerHTML = '';

    // Duyệt qua danh sách người dùng và thêm vào bảng
    users.user.forEach((user, index) => {
        // Tạo một hàng mới trong bảng
        const row = document.createElement('tr');

        // Thêm các cột vào hàng
        let img_text = ''
        if (JSON.parse(user.content).img) {
            img_text=`<td class="username">
            <img class="img_mess"  data-toggle="modal" data-target="#exampleModal" src="${JSON.parse(user.content).img}" alt="" />
            <span>${JSON.parse(user.content).content}</span>
          </td>`
        } else {
            img_text=`<td class="username">
            <span>${JSON.parse(user.content).content}</span>
          </td>`
        }
  
        
        row.innerHTML = `
        <th scope="row">${index + 1}</th>`
        +img_text+
       ` <td>
          ${user.create_at ? new Date(user.create_at).toLocaleDateString() : '--'}
        </td>
        <td>
          <span class=""> ${user.type}</span>
        </td>
        <td class="action">
          
          <button
            class="${user.status == 0 ? 'BanUserButton' : 'UnBanUserButton'}"
            id=${user.id}
        >
            ${
                user.status == 0
                    ? '<i class="fas fa-times-circle"></i>'
                    : '<i class="fa fa-unlock" aria-hidden="true"></i>'
            }
        </button> 
        </td>
      `;

        // Thêm hàng vào bảng
        tableBody.appendChild(row);
    });
}

// Hiển thị trang đầu tiên
createPagination();

