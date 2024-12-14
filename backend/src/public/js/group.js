// Lắng nghe sự kiện click cho tất cả các button có class "editUserButton"
document.addEventListener('click', function (event) {
    
    if (
        event.target.classList.contains('reportUserButton') ||
        (event.target.classList.contains('fas') &&
            event.target.parentElement.classList.contains('reportUserButton'))
    ) {
        // Lấy ID của user từ button

        $('#reportModal .form-loading').removeClass('hidden');
        $('#reportModal .form-loaded').addClass('hidden');
        const userId = event.target.id || event.target.parentElement.id;

        $('.saveChangeBtn').attr('id', userId);
        const handleDate = (day) => {
            const birthdateString = day;
            const date = new Date(birthdateString); // Tạo đối tượng Date từ chuỗi thời gian
            // Sử dụng Date.prototype.toISOString() để định dạng lại chuỗi thời gian theo định dạng ISO 8601
            const formattedDateString = date.toISOString().split('T')[0]; // Lấy phần ngày tháng
            return formattedDateString;
        };
        // Fetch dữ liệu user theo ID
        fetch(`/api/getReportByIdGroup/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                $(document).ready(function () {
                    $('#reportModal .form-loading').addClass('hidden');
                    $('#reportModal .form-loaded').removeClass('hidden');
                });
                if (data.EC == 0) {
                    $('#reportModal .form-loading').removeClass('hidden');
                    $('#reportModal .form-loaded').addClass('hidden');
                    const report = data.DT;


                    // Lấy phần tử bảng HTML
                    const tableBody = document.querySelector('.table-report tbody');

                    // Xóa nội dung hiện tại của bảng
                    tableBody.innerHTML = '';

                    // Duyệt qua danh sách người dùng và thêm vào bảng
                    if (report.length > 0) {
                        
                        report.forEach((report, index) => {
                            // Tạo một hàng mới trong bảng
                            const row = document.createElement('tr');
    
                            // Thêm các cột vào hàng
                            let img_text = '';
                            if (JSON.parse(report.content).img) {
                                img_text = `<td class="username">
                            <img class="img_mess"  data-toggle="modal" data-target="#exampleModal" src="${
                                JSON.parse(report.content).img
                            }" alt="" />
                            <span>${JSON.parse(report.content).content}</span>
                        </td>`;
                            } else {
                                img_text = `<td class="username">
                            <span>${JSON.parse(report.content).content}</span>
                        </td>`;
                            }
                 
    
                            row.innerHTML =
                                `
                        <th scope="row">${index + 1}</th>` +
                                img_text +
                                ` <td>
                        ${report.create_at ? new Date(report.time).toLocaleDateString() : '--'}
                        </td>
                        <td>
                        ${report.create_at ? new Date(report.create_at).toLocaleDateString() : '--'}
                        </td>
                        <td>
                        <span class=""> ${report.type}</span>
                    
                    `;
    
                            // Thêm hàng vào bảng
                            tableBody.appendChild(row);
                        });
                    } else {
                        const row = document.createElement('tr');
                         row.innerHTML = `<tr class="header" style="text-align: center;">
                        <th colspan="5">Không có dữ liệu</th>
                         </tr>`
                        tableBody.appendChild(row);
                    }
                }
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu:', error);
            });
    }

    if (
        event.target.classList.contains('BanUserButton') ||
        (event.target.classList.contains('fas') &&
            event.target.parentElement.classList.contains('BanUserButton'))
    ) {
        const userId = event.target.id || event.target.parentElement.id;
        const button = event.target.closest('.BanUserButton');

        // Fetch dữ liệu user theo ID
        fetch(`/api/banGroupById/${userId}`)
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
     
        const button = event.target.closest('.UnBanUserButton');
        const userId = event.target.id || event.target.parentElement.id;

        // Fetch dữ liệu user theo ID
        fetch(`/api/unbanGroupById/${userId}`)
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
    fetch(`/api/getGroup/${page}`)
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
        row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td class="username">
          <img src="${
              user.avatar
                  ? user.avatar
                  : 'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png'
          }" alt="" />
          ${user.firstname} ${user.lastname}
        </td>
        <td>
        ${user.groupName}
        </td>
        <td>
                    ${user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '--'}

        </td>
        <td>
        ${user.total_members}
        </td>
        <td class="action">
          
           <button
                                                    
                                                        data-toggle="modal"
                                                        data-target="#reportModal"
                                                        id="${user.id}"
                                                        class="reportUserButton"
                                                    >
                                                        <i class="fas fa-flag"></i>
                                                    </button>
          <button
            class="${user.status == 1 ? 'BanUserButton' : 'UnBanUserButton'}"
            id=${user.id}
        >
            ${
                user.status == 1
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
