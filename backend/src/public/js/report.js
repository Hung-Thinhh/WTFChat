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
        fetch(`/api/banUserById/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.EC == 0) {
                    $(document).ready(function () {
                        $('.toast .toast-body').html('Ban user success !');
                        $('.toast').toast('show');
                        button.classList.remove('BanUserButton');
                        button.classList.add('UnBanUserButton');
                        $(button).html('<i class="fa fa-unlock" aria-hidden="true"></i>');
                    });
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
        console.log('ahhaahh');
        const button = event.target.closest('.UnBanUserButton');
        const userId = event.target.id || event.target.parentElement.id;

        // Fetch dữ liệu user theo ID
        fetch(`/api/unbanUserById/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.EC == 0) {
                    $(document).ready(function () {
                        $('.toast .toast-body').html('Unban user success !');
                        $('.toast').toast('show');
                        button.classList.remove('UnBanUserButton');
                        button.classList.add('BanUserButton');
                        $(button).html('<i class="fas fa-times-circle"></i>');
                    });
                }

                // ...
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu:', error);
            });
    }
}); // Call the dataTables jQuery plugin
// Hàm tạo pagination
let currentPage = 1;
function createPagination() {
    $('#pagination').empty(); // Xóa pagination hiện tại
    console.log(totalPages); // Giả sử totalPages đã được khai báo trước đó
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
    console.log(currentPage);

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
            console.log(data);
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
    console.log(users);
    
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
            <img src="${JSON.parse(user.content).img}" alt="" />}
            ${JSON.parse(user.content).content}
          </td>`
        } else {
            img_text=`<td class="username">
            ${JSON.parse(user.content).content}
          </td>`
        }
        console.log(img_text);
        
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
