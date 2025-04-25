import Api from "../api/Api";

const TopicService = {
    getList: async () => {
        const response = await Api.get('topic');
        console.log(response); // In ra toàn bộ phản hồi để kiểm tra
        return response;
    }
}
export default TopicService
