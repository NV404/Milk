export default function Home() {
  return (
    <div className=" flex flex-col items-stretch gap-12 p-10">
      <div className="flex justify-between items-center">
        <div className="rounded-full bg-gray-200 p-2">
          <img src="/menu.svg" alt="menu" className="w-5" />
        </div>
        <p className="text-center font-bold text-2xl ">Gwala</p>
        <div className="rounded-full bg-gray-200 p-2">
          <img src="/search.svg" alt="menu" className="w-5" />
        </div>
      </div>
      <div className="flex justify-between items-center gap-7">
        <div className="w-full bg-white p-3 rounded-2xl shadow-sm">
          <img src="/orders.svg" alt="menu" className="w-20" />
          <div className="w-full justify-between flex items-center">
            <div>
              <p className="font-bold text-2xl">180k</p>
              <p>items</p>
            </div>
            <img src="/arrow-right-black.svg" alt="menu" className="w-10" />
          </div>
        </div>

        <div className="w-full bg-green-500 p-3 text-white rounded-2xl shadow-sm">
          <img src="/items.svg" alt="menu" className="w-20" />
          <div className="w-full justify-between flex items-center">
            <div>
              <p className="font-bold text-2xl">180k</p>
              <p>items</p>
            </div>
            <img src="/arrow-right-white.svg" alt="menu" className="w-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
