const BASE_URL = 'http://localhost:5050/api/';

const apiConst = {
    count_students: `${BASE_URL}admin/fetch_count_of_the_Students`,
    count_teachers: `${BASE_URL}admin/fetch_count_of_the_teachers`,
    count_classes: `${BASE_URL}admin/fetch_count_of_the_classes`,
    get_two_notices: `${BASE_URL}noticeBord/get_two_notice`,
    fetch_all_standards: `${BASE_URL}classcode/get_all_classes`,
    create_class_code: `${BASE_URL}classcode/create_class_code`,
    delete_class_code: `${BASE_URL}classcode/delete_class/`,
    fetch_all_teachers: `${BASE_URL}admin/fetch_all_teachers`,
    fetch_all_students: `${BASE_URL}admin/fetch_all_Students`,
    get_all_classes_std_wise: `${BASE_URL}classcode/get_all_classes_std_wise`,
    send_complains_to_the_t_S: `${BASE_URL}admin/send_complain_t&s`,
    fetch_all_complains_of_admin: `${BASE_URL}admin/fetch_all_complains`,
    update_holidays: `${BASE_URL}admin/edit_holidays/`,
    get_all_holidays: `${BASE_URL}admin/get_all_holidays`,
    send_holidays: `${BASE_URL}admin/send_holiday`,
    delete_holidays: `${BASE_URL}admin/delete_holidays/`,
};

export default apiConst;