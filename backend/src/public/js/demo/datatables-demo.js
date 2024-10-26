// Lắng nghe sự kiện click cho tất cả các button có class "editUserButton"
document.addEventListener('click', function (event) {
    if (
        event.target.classList.contains('editUserButton') ||
        (event.target.classList.contains('fas') &&
            event.target.parentElement.classList.contains('editUserButton'))
    ) {
        // Lấy ID của user từ button
        console.log('haaaaaaaaaaaaaaa');
        $('#editModal .form-loading').removeClass('hidden');
        $('#editModal .form-loaded').addClass('hidden');
        const userId = event.target.id || event.target.parentElement.id;
        console.log(userId);
        $('.saveChangeBtn').attr('id', userId);
        const handleDate = (day) => {
            const birthdateString = day;
            const date = new Date(birthdateString); // Tạo đối tượng Date từ chuỗi thời gian
            // Sử dụng Date.prototype.toISOString() để định dạng lại chuỗi thời gian theo định dạng ISO 8601
            const formattedDateString = date.toISOString().split('T')[0]; // Lấy phần ngày tháng
            return formattedDateString;
        };
        // Fetch dữ liệu user theo ID
        fetch(`/api/getUserById/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                const user = data.DT[0];
                console.log(user);
                $(document).ready(function () {
                    $('#editModal .form-loading').addClass('hidden');
                    $('#editModal .form-loaded').removeClass('hidden');
                    console.log($('#editModal .form-loaded'));
                    console.log($('#editModal .form-loaded').classList);
                });

                $('#editModal #inputFirstname').val(user.firstname);
                $('#editModal #inputLastName').val(user.lastname);
                $('#editModal #inputEmail').val(user.email);
                switch (user.role) {
                    case 0:
                        $('#editModal #inputRole').val('Admin');
                        break;
                    case 1:
                        $('#editModal #inputRole').val('User');
                        break;
                    default:
                        // Nếu giá trị user.gender không hợp lệ, đặt giá trị mặc định cho select
                        $('#editModal #inputRole').val('User'); // Hoặc bạn có thể đặt "Other"
                        break;
                }
                $('#editModal #inputBirthday').val(handleDate(user.birthdate));
                $('#editModal #inputDateCreate').val(handleDate(user.time));
                switch (user.gender) {
                    case 0:
                        $('#editModal #inputGender').val('0');
                        break;
                    case 1:
                        $('#editModal #inputGender').val('1');
                        break;
                    case 2:
                        $('#editModal #inputGender').val('2');
                        break;
                    default:
                        // Nếu giá trị user.gender không hợp lệ, đặt giá trị mặc định cho select
                        $('#editModal #inputGender').val('Male'); // Hoặc bạn có thể đặt "Other"
                        break;
                }
                // ...
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu:', error);
            });
    }
    function checkInputs(inputs) {
        console.log(inputs);

        const data = {};
        for (let i = 0; i < inputs.length; i++) {
            const input = $(inputs[i]);
            const name = input.attr('name');

            if (input.is(':text')) {
                const value = input.val().trim();
                if (value === '') {
                    input.addClass('is-invalid');
                } else {
                    input.removeClass('is-invalid');
                }
                data[name] = value;
            } else if (input.attr('type') === 'date') {
                const value = input.val();
                if (value === '') {
                    input.addClass('is-invalid');
                } else {
                    input.removeClass('is-invalid');
                }
                data[name] = value;
            }
        }
        return data;
    }
    if (event.target.classList.contains('saveChangeBtn')) {
        $(event.target).prop('disabled', true);
        $(event.target).html(
            '<span style="margin-right:10px" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...',
        );
        const inputFirstname = $('#inputFirstname').val().trim();
        const inputLastName = $('#inputLastName').val().trim();
        const inputBirthday = $('#inputBirthday').val();
        const inputGender = $('#inputGender').val();
        let isValid = false;
        if (!inputFirstname && !inputLastName) {
            $('#inputFirstname').addClass('is-invalid');
            $('#inputLastName').addClass('is-invalid');
            isValid = true;
        }
        $('#editModal').on('focus', '#inputFirstname, #inputLastname', function () {
            $('#editModal #inputFirstname').removeClass('is-invalid');
            $('#editModal #inputLastName').removeClass('is-invalid');
        });
        if (!isValid) {
            fetch('/api/edit-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: inputFirstname,
                    lastName: inputLastName,
                    birthday: inputBirthday,
                    gender: inputGender,
                    id: event.target.id,
                    // ... các giá trị khác
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    $(event.target).prop('disabled', false);
                    $(event.target).html('Save changes');
                    if (data.EC == 0) {
                        $('#editModal').modal('hide');
                    } else {
                        $('.toast .toast-body').html('Update failed !');
                    }
                    $('.toast').toast('show');
                })
                .catch((error) => {
                    $(event.target).prop('disabled', false);
                    $(event.target).html('Save changes');
                    $('.toast .toast-body').html('Update failed !');
                    $('.toast').toast('show');
                });
        }
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
    tableBody.innerHTML =
        
                    `    <td colspan="6">
                    <div class="d-flex justify-content-center form-loading" style="width:100%">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div></td>`;
    fetch(`/api/getUser/${page}`)
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
          ${user.time ? new Date(user.time).toLocaleDateString() : '--'}
        </td>
        <td>
          ${user.role === 1 ? 'User' : 'Admin'}
        </td>
        <td>
          <span class="status text-success">•</span>Active
        </td>
        <td class="action">
          <button data-toggle="modal" data-target="#editModal" id="${
              user.id
          }" class="editUserButton">
            <i class="fas fa-cog"></i>
          </button>
          <button data-toggle="tooltip" data-original-title="Delete">
            <i class="fas fa-times-circle"></i>
          </button>
        </td>
      `;

        // Thêm hàng vào bảng
        tableBody.appendChild(row);
    });
}

// Hiển thị trang đầu tiên
createPagination();
