// Lắng nghe sự kiện click cho tất cả các button có class "editUserButton"
document.addEventListener('click', function (event) {
    if (
        event.target.classList.contains('editUserButton') ||
        (event.target.classList.contains('fas') &&
            event.target.parentElement.classList.contains('editUserButton'))
    ) {
        // Lấy ID của user từ button
     
        const userId = event.target.id || event.target.parentElement.id;

        $('.saveChangeBtn').attr('id', userId);
        const found = report_type.find((item) => item.id == userId);
   



        $('#inputContent').val(found.content);
        $('#inputInfor').val(found.infor);
    }
    if (event.target.classList.contains('btn_add')) {
        $('#editModal .btn-primary').addClass('addReport_btn');
        $('#editModal .btn-primary').removeClass('saveChangeBtn');
    }
    if (event.target.classList.contains('addReport_btn')) {
        
        
        const inputContent = $('#inputContent').val().trim();
        const inputInfor = $('#inputInfor').val().trim();
        let isValid = false;
        if (!inputContent) {
            $('#inputContent').addClass('is-invalid');
            isValid = true;
        }
       
        $('#editModal').on('focus', '#inputContent', function () {
            $('#editModal #inputContent').removeClass('is-invalid');
        });
        if (!isValid) {
            $(event.target).prop('disabled', true);
            $(event.target).html(
                '<span style="margin-right:10px" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...',
            );
            fetch('/api/add-reportType', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: inputContent,
                    infor: inputInfor,
                    id: event.target.id,
                    // ... các giá trị khác
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                 
                    $(event.target).prop('disabled', false);
                    $(event.target).html('Save changes');
                    if (data.EC == 0) {
                      
                        
                        $('#editModal').modal('hide');
                        $('.toast .toast-body').html('Save changes successfully');
                        let lastRow = $('table tr:last').find('th').html();
                     
                        
                        $('table tbody').append(`
                            <tr id=${data.DT.id}>
                              <th>${parseInt(lastRow)+1}</th>
                              <td>${data.DT.content}</td>
                              <td>${data.DT.infor}</td>
                              <td class="action">
                            <button data-toggle="modal" data-target="#editModal" id="${data.DT.id}" class="editUserButton">
                                <i class="fas fa-cog"></i>
                            </button>
                            <button
                                class="BanUserButton"
                                id=${data.DT.id}
                            > 
                            <i class="fas fa-times-circle"></i>
                                      
                            </button> 
                            </td>
                              <!-- Thêm các cột khác nếu cần -->
                            </tr>
                          `);
                          $('#editModal .btn-primary').removeClass('addReport_btn');
                        $('#editModal .btn-primary').addClass('saveChangeBtn');
                        $('#inputInfor').val('');
                        $('#inputContent').val('');
                        report_type.push(data.DT);
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
    if (event.target.classList.contains('saveChangeBtn')) {
        $(event.target).prop('disabled', true);
        $(event.target).html(
            '<span style="margin-right:10px" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...',
        );
        const inputContent = $('#inputContent').val().trim();
        const inputInfor = $('#inputInfor').val().trim();
        let isValid = false;
        if (!inputContent) {
            $('#inputContent').addClass('is-invalid');
            isValid = true;
        }
        $('#editModal').on('focus', '#inputContent', function () {
            $('#editModal #inputContent').removeClass('is-invalid');
        });
        if (!isValid) {
            fetch('/api/edit-reportType', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: inputContent,
                    infor: inputInfor,
                    id: event.target.id,
                    // ... các giá trị khác
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                   
                    $(event.target).prop('disabled', false);
                    $(event.target).html('Save changes');
                    if (data.EC == 0) {
                        $('#editModal').modal('hide');
                        $('.toast .toast-body').html('Save changes successfully');
                        $(`tr#${event.target.id}`).find('td:nth-child(2)').text(inputContent);
                        $(`tr#${event.target.id}`).find('td:nth-child(3)').text(inputInfor);
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
    if (
        event.target.classList.contains('BanUserButton') ||
        (event.target.classList.contains('fas') &&
            event.target.parentElement.classList.contains('BanUserButton'))
    ) {
        const userId = event.target.id || event.target.parentElement.id;
        const button = event.target.closest('.BanUserButton');

        // Fetch dữ liệu user theo ID
        fetch(`/api/banReportType/${userId}`)
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
        fetch(`/api/unbanReportType/${userId}`)
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

