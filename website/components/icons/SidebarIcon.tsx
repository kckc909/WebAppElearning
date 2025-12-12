import { SidebarItem, SidebarTab } from "../../types/types";

const SidebarIcon: React.FC<{ item: SidebarItem, activeTab: SidebarTab, setActiveTab: (tab: SidebarTab) => void }> = ({ item, activeTab, setActiveTab }) => (
    <button
        onClick={() => setActiveTab(item.id)}
        className={`flex flex-col items-center justify-center w-full h-20 transition-colors duration-200 relative ${activeTab === item.id ? 'text-primary bg-blue-50' : 'text-slate-500 hover:bg-slate-100'}`}
        aria-label={item.label}
    >
        {activeTab === item.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
        <ion-icon name={item.icon} class="text-2xl"></ion-icon>
        <span className="text-xs mt-1">{item.label}</span>
        {item.notification && (
            <span className="absolute top-2 right-4 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">{item.notification}</span>
        )}
    </button>
);

export default SidebarIcon;
