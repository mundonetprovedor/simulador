# Bootcamp Intensivo: Operação e Suporte em Provedor de Internet (N1 e N2 Básico)

**Duração:** 3 Semanas (21 dias)
**Público-alvo:** Funcionários iniciantes (totalmente leigos, sem experiência prévia em telecom)
**Objetivo:** Formar atendentes e operadores capazes de diagnosticar, atender, resolver e escalar problemas reais de clientes utilizando IXC Soft, OLTs Huawei e FiberHome com máxima eficiência operacional.

---

## 📅 SEMANA 1 — FUNDAMENTOS + IXC + ATENDIMENTO
**Objetivo:** Ensinar do zero como funciona a operação de um provedor, uso diário do sistema IXC Soft e as bases de um atendimento humanizado e técnico.

### Módulo 1: O Mundo do Provedor de Internet (Dias 1 a 2)
* **O que é um provedor:** Como a internet sai da nossa central e chega na casa do cliente (o caminho da fibra).
* **Fibra Óptica na Prática:** A diferença entre fibra (vidro/luz) e cabo de rede (cobre/energia). Cuidados essenciais (não dobrar, não amassar, não puxar).
* **A Sopa de Letrinhas (Equipamentos):** 
  * **OLT (Central):** O equipamento gigante na nossa base que ilumina a rede. Usamos **Huawei** e **FiberHome**.
  * **ONU / ONT (Cliente):** O aparelhinho que converte a luz da fibra em internet na casa do cliente.
  * **Roteador:** O equipamento que recebe a internet da ONU e distribui o Wi-Fi.
* **Redes Wi-Fi (A Regra de Ouro):** 
  * **2.4GHz:** Vai longe, atravessa paredes, mas entrega menos velocidade.
  * **5GHz:** Entrega muita velocidade, mas não vai longe e sofre com paredes.
* **PPPoE:** O "Login e Senha" de autenticação. É o RG do roteador para se conectar à nossa OLT.

### Módulo 2: Interpretando Sinais e Luzes (Dia 3)
* **Interpretando os LEDs da ONU:**
  * **PON (Verde fixo):** Perfeito. ONU autenticada na OLT.
  * **LOS (Piscando Vermelho):** Emergência! Fibra rompida, sem sinal óptico.
  * **LAN:** Cabo de rede conectado corretamente entre a ONU e o roteador.
* **Sinal Óptico Básico:** 
  * O que é dBm? Como funciona a escala negativa.
  * **Sinal Bom:** -15 a -25 dBm.
  * **Sinal Ruim (Atenuado):** -28, -30, -35 dBm (Causa lentidão, quedas e perda de pacote).
* **Online x Offline:** Entendendo os status básicos de rede.

### Módulo 3: Operação de Guerrilha no IXC Soft (Dias 4 a 5)
* **Navegação e Busca:** Como localizar um cliente rapidamente (Nome, CPF, Endereço, Telefone).
* **Painel do Cliente:** Como ver de cara se ele está Online ou Offline.
* **Aba PPPoE:** Visualização de login, senha, IP e tempo da sessão (uptime).
* **Ações Operacionais:** 
  * **Desbloqueio / Liberação de Confiança:** Como dar aqueles dias extras pro cliente pagar.
  * **Histórico de Conexões:** O cliente diz que cai toda hora? Aqui vemos a verdade.
  * **Financeiro Básico:** Como ver faturas pendentes, geradas e pagas.
  * **Abertura de O.S. (Ordem de Serviço):** Como abrir o chamado correto, detalhar o problema e anexar prints.
  * **Cadastro Técnico:** Onde consultar a CTO, porta e MAC/SN do cliente.

### Módulo 4: Excelência e Controle no Atendimento (Dias 6 a 7)
* **Comunicação Multicanal:** Postura no WhatsApp (texto ágil e claro) e no Telefone (voz calma e segurança).
* **Scripts de Atendimento (O que falar e como falar):**
  * *Cliente sem conexão:* Passo a passo para pedir verificação de luzes e cabos.
  * *Lentidão:* Como guiar o cliente a testar via cabo e entender as limitações do Wi-Fi.
  * *Inadimplência:* Como cobrar educadamente e oferecer o botão de confiança.
* **Gestão de Crise:** Técnicas para acalmar cliente irritado (escuta ativa + foco na solução).
* **Registro de Atendimento:** Regra máxima: "O que não está no IXC, nunca aconteceu."

---

## 📅 SEMANA 2 — N1 + N2 BÁSICO + DIAGNÓSTICO
**Objetivo:** Formar capacidade real de análise técnica, interpretar os sistemas das OLTs e diagnosticar a raiz do problema.

### Módulo 5: Visão da Central - Huawei & FiberHome (Dias 8 a 10)
* **Status da ONU na OLT:** Como consultar se está de fato Online, Offline ou "Piscando" (caindo e voltando).
* **Potência e Sinal (TX/RX):** Como ler o sinal óptico diretamente na OLT para saber se o problema é na fibra.
* **Diagnóstico de Falhas Comuns:**
  * **LOS na OLT:** O sistema acusa que perdeu contato com o cliente.
  * **ONU Desautorizada:** Alarme de equipamento resetado ou trocado indevidamente.
  * **Queda de Autenticação / Derrubando Sessão:** PPPoE caindo por falha de configuração ou ataque no roteador.
  * **Porta sem Sinal:** Suspeita de porta queimada na CTO (caixa da rua) ou conector sujo.
* **Ações Básicas:** Reinício remoto (Reboot) e provisionamento básico de ONU.

### Módulo 6: Ferramentas de Diagnóstico N2 (Dias 11 a 12)
* **O Básico que Funciona:**
  * **Ping:** O que é? (Como jogar a bolinha e ver quanto tempo ela demora pra voltar).
  * **Ping Gateway vs Ping DNS:** Se pinga no roteador mas não pinga no Google, o problema é provedor!
  * **Tracert (Traçar Rota):** Identificando onde a internet está engarrafando.
* **Conceitos Críticos:**
  * **DNS:** O "Lista Telefônica" da internet. Como problemas de DNS geram a sensação de "internet caiu".
  * **Latência (Ping Alto) x Perda de Pacote:** Diferença entre lentidão e falha de entrega.
* **Lentidão e Interferência:** Canais Wi-Fi sobrepostos, paredes, espelhos, micro-ondas — como explicar isso ao cliente de forma didática.

### Módulo 7: O Checklist Operacional (Dias 13 a 14)
* **A Regra de Ouro:** É Rede Interna (dentro da casa) ou Rede Externa (rua/provedor)?
* **Checklist Obrigatório de Atendimento:**
  1. Cliente autenticado no IXC? *(Sim/Não)*
  2. ONU online na OLT? *(Sim/Não)*
  3. Sinal está normal (-15 a -25)? *(Sim/Não)*
  4. Financeiro OK (sem bloqueios)? *(Sim/Não)*
  5. Roteador responde ao Ping? *(Sim/Não)*
  6. **Decisão:** O problema é Interno ou Externo?
  7. **Ação:** Eu resolvo via sistema ou Escalo para a rua/N3?

---

## 📅 SEMANA 3 — OPERAÇÃO REAL + PRODUTIVIDADE
**Objetivo:** Transformar o conhecimento teórico em rotina de alta performance com simulações e métricas reais.

### Módulo 8: Laboratório e Casos Reais (Dias 15 a 18)
*Dinâmica: Simulador de WhatsApp e ligações. O aluno opera o IXC e as OLTs para resolver.*
* **Caso 1: Sem Internet.** (Cenário: Fatura vencida. Aluno deve identificar no IXC e negociar).
* **Caso 2: Lentidão no PS5.** (Cenário: Cliente jogando no Wi-Fi 2.4GHz com parede no meio. Aluno deve educar e mudar pro cabo/5G).
* **Caso 3: ONU Offline (LOS).** (Cenário: Luz vermelha. Aluno deve abrir O.S. para técnico de rua com descrição perfeita).
* **Caso 4: Cliente irritado com quedas.** (Cenário: Sinal óptico em -32 dBm na Huawei. Aluno deve identificar, acalmar e enviar técnico).
* **Caso 5: Inadimplência.** (Cenário: Liberação de confiança negada pois já foi usada. Como agir).
* **Caso 6: Falha Massiva.** (Cenário: 15 clientes ligando juntos. Como ver no mapa do IXC/OLT que um cabo rompeu na rua X).

### Módulo 9: Produtividade, Rotina e Escalonamento (Dias 19 a 20)
* **TMA (Tempo Médio de Atendimento):** Como resolver o problema em menos de 8 minutos no WhatsApp.
* **FCR (First Call Resolution):** A importância de resolver no 1º contato (evita retrabalho e fúria do cliente).
* **A Arte de Abrir O.S.:** Como enviar o técnico de rua. (O.S. sem detalhe = técnico perdido = perda de tempo/dinheiro).
* **Quando acionar o N3 (Engenharia):** Falhas de BGP, OLT isolada, problemas generalizados de lentidão em rotas específicas.

### Módulo 10: Avaliação e Formatura (Dia 21)
* **Prova Prática Diária (Role-play Final):** Cada aluno atende 5 casos sorteados. Deve aplicar o *Checklist Operacional* em tempo real.
* Feedback de pontos fortes e de melhoria.

---

## 🛠 MATERIAIS OBRIGATÓRIOS DO CURSO (Entregáveis para a Equipe)

Para garantir que o operador nunca trave durante o trabalho, a mesa/computador dele deve contar com:

1. **Apostila Interna Digital:** O resumo dos 3 módulos.
2. **Fluxograma Visual de Diagnóstico (Impresso na Parede ou Mesa):**
   `Cliente reclama -> Checar Financeiro -> Checar IXC (Autenticado?) -> Checar OLT (Sinal Bom?) -> Pingar Roteador -> Responde? (Problema é Wi-Fi/Interno) / Não Responde? (O.S. de Reparo)`.
3. **Manual Visual (Com Prints Reais):**
   * Onde clicar no IXC Soft (circulado em vermelho).
   * Telas dos sistemas Huawei e FiberHome traduzidas.
   * Tabela ilustrativa de ONUs e Roteadores (Mostrando as portas e os LEDs).
4. **Playbook de Suporte (Scripts):** Textos pré-aprovados para copiar e colar (Saudação, Pedido de testes de cabo, Explicação sobre Wi-Fi 5Ghz, Encerramento).
5. **Tabela de Ação Rápida (Erros Comuns):**
   
| Problema do Cliente | O que olhar na Tela | Qual a Causa Provável | O que o Atendente Faz |
| :--- | :--- | :--- | :--- |
| "Tá tudo com luz vermelha" | Status Offline (LOS) | Fibra rompida / Dobrada | Abre O.S. de Reparo Físico |
| "A internet cai toda hora" | Histórico PPPoE no IXC / Sinal na OLT | Sinal Ruim (-30) ou Roteador reiniciando | Checa sinal, tenta reiniciar, se não resolver: O.S. |
| "A internet tá muito lenta" | Tipo de conexão (cabo ou Wi-Fi) | Conectado no 2.4GHz longe do roteador | Pede teste no cabo. Orienta sobre rede 5GHz. |
| "As luzes tão verdes, mas não navega" | Status no IXC (Financeiro) | Bloqueio Financeiro ou Falha de DNS | Checa faturas. Libera confiança. Altera DNS remoto. |

---
**Resultado Esperado:** 
Em 21 dias, o iniciante sairá de "não sei o que é fibra" para um **operador cirúrgico**, capaz de bater o olho no IXC, cruzar os dados com a Huawei/FiberHome e tomar uma decisão correta em poucos minutos, evitando visitas técnicas desnecessárias e melhorando a qualidade do serviço.
