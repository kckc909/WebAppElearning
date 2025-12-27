import { ToolCase } from "lucide-react"

const Tab_Docs = ({ selectedClass }: any) => {
    return (
        <div className="text-center py-20">
            <ToolCase className="mx-auto w-12 h-12 text-slate-300 mb-4" strokeWidth={1.3} />

            <p className="text-slate-500">Chức năng đang được cập nhật cho lớp {selectedClass.name}</p>
        </div>
    )
}
export default Tab_Docs;