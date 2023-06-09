const BASE_URL = "http://localhost:5050/api/";

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
  delete_complains: `${BASE_URL}admin/delete_complain/`,
  edit_complains: `${BASE_URL}admin/edit_complain/`,

  fetch_all_events: `${BASE_URL}admin/get_all_eventes`,
  delete_events: `${BASE_URL}admin/delete_events/`,
  send_event: `${BASE_URL}admin/send_event`,
  edit_event: `${BASE_URL}admin/edit_Events/`,
  fetch_all_event_photos: `${BASE_URL}admin/fetch_all_events_photoes`,
  upload_event_photos: `${BASE_URL}admin/upload_event_photos`,
  delete_event_photos: `${BASE_URL}admin/delete_evente_photoes/`,
  get_two_event: `${BASE_URL}admin/get_two_event`,

  get_fees_of_all_standards: `${BASE_URL}admin/get_all_standard_fees`,
  edit_fees_of_standard: `${BASE_URL}admin/edit_fees_of_standard/`,

  update_holidays: `${BASE_URL}admin/edit_holidays/`,
  get_all_holidays: `${BASE_URL}admin/get_all_holidays`,
  send_holidays: `${BASE_URL}admin/send_holiday`,
  delete_holidays: `${BASE_URL}admin/delete_holidays/`,

  create_teacher: `${BASE_URL}teachers/create_teacher`,
  delete_teachers_info: `${BASE_URL}teachers/delete_teachers_info/`,
  update_teacher_details: `${BASE_URL}teachers/update_teacher_details/`,

  login: `${BASE_URL}admin/admin_login`,

  send_notice: `${BASE_URL}noticeBord/send_notice`,
  get_all_notice: `${BASE_URL}noticeBord/get_all_notice`,
  edit_Notice: `${BASE_URL}noticeBord/edit_Notice/`,
  delete_notice: `${BASE_URL}noticeBord/delete_notice/`,

  create_students: `${BASE_URL}students/create_students`,
  update_student_details: `${BASE_URL}students/update_student_details/`,
  delete_students_info: `${BASE_URL}students/delete_students_info/`,
  get_all_subjects: `${BASE_URL}subject/get_all_subjects_class_wise`,

  fetch_all_timetable_by_classes: `${BASE_URL}timetable/fetch_all_timetable_by_classes`,
  make_timetable: `${BASE_URL}timetable/make_timetable`,
  set_examtimetable: `${BASE_URL}examtimetable/set_examtimetable`,
  fetch_all_examtimetable: `${BASE_URL}examtimetable/fetch_all_examtimetable`,
  edit_examtimetable: `${BASE_URL}examtimetable/edit_examtimetable/`,
  edit_timetable: `${BASE_URL}timetable/edit_timetable/`,

  upload_results: `${BASE_URL}results/upload_results`,
  fetch_results_of_student: `${BASE_URL}results/fetch_results_of_student`,
  delete_results: `${BASE_URL}results/delete_results/`,

  create_subject: `${BASE_URL}subject/create_subject`,
  get_all_subjects_class_wise: `${BASE_URL}subject/get_all_subjects_class_wise`,
  delete_subject: `${BASE_URL}subject/delete_subject/`,
};

export default apiConst;
