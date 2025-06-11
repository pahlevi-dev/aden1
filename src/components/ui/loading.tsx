interface IProps {
  type?: 'default' | 'table' | 'cards';
}
export const Loading = ({ type = 'default' }: IProps) => {
  switch (type) {
    case 'cards':
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-4 bg-gray-200 rounded-lg animate-pulse">
              <div className="h-24 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      );

    default:
      return <div>Loading...</div>;
  }
};
