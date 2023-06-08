const BASE_URL = 'http://localhost:5050/api/';

const apiConst = {
    count_students: `${BASE_URL}admin/fetch_count_of_the_Students`,
    count_teachers: `${BASE_URL}admin/fetch_count_of_the_teachers`,
    count_classes: `${BASE_URL}admin/fetch_count_of_the_classes`,
    get_two_notices: `${BASE_URL}noticeBord/get_two_notice`,
    fetch_all_standards: `${BASE_URL}classcode/get_all_classes`
};

export default apiConst;