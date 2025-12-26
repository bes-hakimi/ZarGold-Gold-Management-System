import DateTimeDisplay from "./DateTimeDisplay";
import { PageHeader } from "@/components/ui/PageHeader";

const Header = () => {
  return (
    <header className="">
      <div className="flex flex-col gap-4">
        
        <PageHeader
          title="نرخ‌های جهانی بازار"
          description="آخرین نرخ‌های روز اسعار و جواهرات بر اساس بازار جهان"
          showHomeIcon={true}
        />

        {/* Date & Time */}
          <DateTimeDisplay />
      </div>
    </header>
  );
};

export default Header;
