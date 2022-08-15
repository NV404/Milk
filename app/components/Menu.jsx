export default function Menu() {
  return (
    <div className="flex justify-between items-center">
      <div className="rounded-full bg-gray-200 p-2">
        <img src="/menu.svg" alt="menu" className="w-5" />
      </div>
      <p className="text-center font-bold text-2xl ">Gwala</p>
      <div className="rounded-full bg-gray-200 p-2">
        <img src="/search.svg" alt="menu" className="w-5" />
      </div>
    </div>
  );
}
