const PrivacyPolicy = () => {
  return (
    <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-xl rounded-xl p-8 max-w-4xl mx-auto my-10 border border-gray-300 dark:border-zinc-700 transition-all duration-300">
      <h1 className="text-3xl font-bold text-zinc-800 dark:text-white mb-4 flex items-center gap-2">
        📑 <span>Termo de Privacidade</span>
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        <strong>Última atualização:</strong> 19 de agosto de 2025
      </p>

      <section className="space-y-6 text-zinc-700 dark:text-zinc-200">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            📥 Coleta de Informações
          </h2>
          <p>
            Podemos coletar dados como nome, e-mail, páginas acessadas, tempo de
            navegação, tipo de dispositivo e IP.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🎯 Uso das Informações
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Melhorar a experiência do usuário</li>
            <li>Personalizar conteúdos e funcionalidades</li>
            <li>Garantir a segurança da aplicação</li>
            <li>Enviar comunicações relevantes (com consentimento)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🔒 Armazenamento e Segurança
          </h2>
          <p>
            Seus dados são armazenados em servidores seguros com acesso restrito
            e protegidos por medidas técnicas e organizacionais.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            📤 Compartilhamento de Dados
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Com autoridades legais, quando exigido</li>
            <li>Com parceiros sob contrato de confidencialidade</li>
            <li>Com serviços de análise, de forma anonimizada</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🍪 Cookies e Tecnologias Semelhantes
          </h2>
          <p>
            Utilizamos cookies para melhorar a navegação e coletar dados
            estatísticos. Você pode desativá-los nas configurações do navegador.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🧍 Direitos do Usuário
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Acessar seus dados pessoais</li>
            <li>Solicitar a correção de informações incorretas</li>
            <li>Solicitar exclusão de dados</li>
            <li>Revogar consentimentos</li>
          </ul>
          <p>
            Para exercer seus direitos, envie um e-mail para:{" "}
            <strong className="text-zinc-900 dark:text-white">
              <a href="mailto:tecnologia@itapecerica.sp.gov.br">
                tecnologia@itapecerica.sp.gov.br
              </a>
            </strong>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🔄 Alterações neste Termo
          </h2>
          <p>
            Este termo pode ser atualizado periodicamente. O uso contínuo da
            aplicação após alterações implica concordância.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
