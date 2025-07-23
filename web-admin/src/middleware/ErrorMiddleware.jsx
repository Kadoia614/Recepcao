const ErrorMiddleware = ({error}) => {
  return (
    <div className="w-full h-full">
      <section className="flex flex-col justify-center items-center h-full">
        <h1 className="text-5xl text-center">Erro ao carregar a página...</h1>
        <h2 className="text-4xl text-center text-red-300 font-bold my-6">{error.code}</h2>
        <p className="text-lg">{error.message}</p>
      </section>
    </div>
  );
};

export default ErrorMiddleware;
