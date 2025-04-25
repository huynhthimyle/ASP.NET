import Api from "../api/Api";

const PostService = {
    getList: async () => {
        const response = await Api.get('post');
        console.log(response); // In ra toàn bộ phản hồi để kiểm tra
        return response;
    }
}
export default PostService
