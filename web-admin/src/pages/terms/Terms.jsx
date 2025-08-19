const Terms = () => {
  return (
    <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-xl rounded-xl p-8 max-w-4xl mx-auto my-10 border border-gray-300 dark:border-zinc-700 transition-all duration-300">
      <h1 className="text-3xl font-bold text-zinc-800 dark:text-white mb-4 flex items-center gap-2">
        📄 <span>Termos de Uso da Aplicação</span>
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        <strong>Última atualização:</strong> 19 de agosto de 2025
      </p>

      <section className="space-y-6 text-zinc-700 dark:text-zinc-200">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🧾 Aceitação dos Termos
          </h2>
          <p>
            Ao acessar ou utilizar esta aplicação, você declara que leu,
            entendeu e concorda com estes Termos de Uso. Se não concordar, não
            utilize a aplicação.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            👤 Cadastro e Conta
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              O usuário deve fornecer informações verdadeiras e atualizadas.
            </li>
            <li>
              É proibido compartilhar sua conta ou usar contas de terceiros.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🔐 Privacidade
          </h2>
          <p>
            Seus dados serão tratados conforme nossa{" "}
            <a
              href="https://privacy.microsoft.com/pt-br/privacystatement"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition"
            >
              Política de Privacidade
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🚫 Condutas Proibidas
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Usar a aplicação para fins ilegais ou não autorizados.</li>
            <li>
              Tentar acessar áreas restritas ou interferir no funcionamento da
              aplicação.
            </li>
            <li>
              Publicar conteúdo ofensivo, discriminatório ou que viole direitos
              de terceiros.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            📱 Funcionalidades e Disponibilidade
          </h2>
          <p>
            Nos esforçamos para manter a aplicação funcional, mas não garantimos
            ausência de erros ou interrupções. Atualizações podem ocorrer sem
            aviso prévio.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🛡️ Propriedade Intelectual
          </h2>
          <p>
            Todo o conteúdo é protegido por direitos autorais e não pode ser
            reproduzido sem autorização.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            ⚖️ Limitação de Responsabilidade
          </h2>
          <p>
            Não nos responsabilizamos por danos decorrentes do uso ou da
            impossibilidade de uso da aplicação.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🔄 Alterações nos Termos
          </h2>
          <p>
            Podemos modificar estes termos a qualquer momento. O uso contínuo
            após alterações implica aceitação.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            📬 Contato
          </h2>
          <p>
            Para dúvidas ou sugestões, entre em contato pelo e-mail:{" "}
            <strong className="text-zinc-900 dark:text-white">
              <a href="mailto:tecnologia@itapecerica.sp.gov.br">
                tecnologia@itapecerica.sp.gov.br
              </a>
            </strong>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Terms;
