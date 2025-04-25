import Api from "../api/Api"

const BrandService = {
    getList: async () => {
        return await Api.get('brand')
    }
}
export default BrandService