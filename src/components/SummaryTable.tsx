
import React from 'react';

export default function SummaryTable() {
    const data = [
        {
            field: "Vũ Trụ Học",
            issue: "Tại sao vũ trụ có trật tự và hiểu được bằng toán học?",
            solution: "Vũ trụ là sản phẩm của Lý Trí Sáng Tạo (Creative Reason), mang cấu trúc của Logos.",
            sources: "Benedict XVI, Gioan 1, Sáng Thế 1"
        },
        {
            field: "Lịch Sử",
            issue: "Thời gian là vòng lặp vô nghĩa hay tiến trình có đích?",
            solution: "Lịch sử là tuyến tính, là Lịch sử Cứu độ (Heilgeschichte) hướng về Cánh chung.",
            sources: "Augustine (City of God), Jean Daniélou, Balthasar"
        },
        {
            field: "Nhận Thức Luận",
            issue: "Làm sao con người biết được chân lý khách quan?",
            solution: "Logic con người phản chiếu Logic thần linh; Lời Chúa là tiền đề cho mọi tri thức.",
            sources: "Gordon Clark, Cornelius Van Til, Philo"
        },
        {
            field: "Nhân Học",
            issue: "Con người là ai và tại sao đau khổ?",
            solution: "Con người là Imago Dei đối thoại; Đau khổ được thánh hóa và mang nghĩa cứu độ qua Lời Thập Giá.",
            sources: "Gioan Phaolô II (Salvifici Doloris), Thần học Thân xác"
        },
        {
            field: "Đạo Đức",
            issue: "Cơ sở nào cho phân biệt thiện/ác?",
            solution: "Lời Chúa cung cấp chuẩn mực khách quan (Luật Chúa) vượt trên sự thỏa thuận xã hội.",
            sources: "Ratzinger, Cựu Ước (Thập Điều)"
        }
    ];

    return (
        <div className="my-12">
            {/* Mobile Card View */}
            <div className="md:hidden space-y-6">
                {data.map((row, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg border border-secondary/20 shadow-sm flex flex-col gap-4">
                        <div className="border-b border-gray-100 pb-2">
                            <span className="text-xs uppercase tracking-wider text-secondary font-bold">Lĩnh Vực</span>
                            <h3 className="text-xl font-display font-bold text-primary">{row.field}</h3>
                        </div>

                        <div>
                            <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Vấn Đề Cốt Lõi</span>
                            <p className="font-body text-text-primary">{row.issue}</p>
                        </div>

                        <div className="bg-secondary/5 p-3 rounded-md -mx-2 px-4">
                            <span className="block text-xs uppercase tracking-wider text-secondary font-bold mb-1">Giải Pháp Logos</span>
                            <p className="font-body text-text-primary italic">{row.solution}</p>
                        </div>

                        <div>
                            <span className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Nguồn</span>
                            <p className="text-sm text-text-secondary">{row.sources}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto border border-secondary/20 rounded-lg shadow-sm">
                <table className="w-full text-left border-collapse bg-white">
                    <thead>
                        <tr className="bg-secondary/10 border-b border-secondary/20">
                            <th className="p-4 font-display font-bold text-primary border-r border-secondary/20 min-w-[120px]">Lĩnh Vực</th>
                            <th className="p-4 font-display font-bold text-primary border-r border-secondary/20 min-w-[200px]">Vấn Đề Cốt Lõi</th>
                            <th className="p-4 font-display font-bold text-primary border-r border-secondary/20">Giải Pháp Từ Lời Chúa (Logos)</th>
                            <th className="p-4 font-display font-bold text-primary min-w-[150px]">Nguồn Tiêu Biểu</th>
                        </tr>
                    </thead>
                    <tbody className="font-body text-sm text-text-primary">
                        {data.map((row, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-bold text-secondary border-r border-gray-100">{row.field}</td>
                                <td className="p-4 border-r border-gray-100">{row.issue}</td>
                                <td className="p-4 border-r border-gray-100">{row.solution}</td>
                                <td className="p-4 italic text-text-secondary">{row.sources}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
