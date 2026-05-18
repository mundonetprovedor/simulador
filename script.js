document.addEventListener('DOMContentLoaded', () => {
    // Navigation State
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.page-section');
    const pageTitle = document.getElementById('page-title');
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');

    // Section Titles
    const titles = {
        'intro': 'Visão Geral do Treinamento',
        'mod1': 'Módulo 1: Introdução a Redes',
        'mod2': 'Módulo 2: O Caminho dos Dados',
        'mod3': 'Módulo 3: Conceitos Básicos de Rede',
        'mod4': 'Módulo 4: Equipamentos na Prática',
        'mod5': 'Módulo 5: Cabeamento & Fibra Óptica',
        'mod6': 'Módulo 6: Dominando a Tecnologia Wi-Fi',
        'mod7': 'Módulo 7: Diagnóstico Avançado de Rede',
        'mod8': 'Módulo 8: Atendimento Técnico & Triagem',
        'mod9': 'Módulo 9: NOC & Monitoramento Geral',
        'avaliacao': 'Simulador Final & Prova N1'
    };

    // Module progress management (9 modules)
    const totalModules = 9;
    let completedModules = JSON.parse(localStorage.getItem('mundonet_academy_progress') || '[]');

    // Track active slide/section navigation
    window.navigateTo = (targetId) => {
        // Find if target is assessment and handle name input
        if (targetId === 'avaliacao' && !localStorage.getItem('novato_student_name')) {
            const name = prompt("Antes de iniciar a provinha final, digite seu nome completo:");
            if (name && name.trim() !== '') {
                localStorage.setItem('novato_student_name', name);
                document.querySelector('.user-name').textContent = name;
            } else {
                localStorage.setItem('novato_student_name', 'Novato');
            }
        }

        // Hide all sections
        sections.forEach(sec => sec.classList.remove('active'));
        
        // Show target
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update nav item active states
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === targetId) {
                item.classList.add('active');
            }
        });

        // Update title
        if (titles[targetId]) {
            pageTitle.textContent = titles[targetId];
        }

        // Scroll content area back to top
        const contentScrollable = document.querySelector('.scrollable-content');
        if (contentScrollable) contentScrollable.scrollTop = 0;

        // Auto mark completion of modules on visit after a delay
        if (targetId.startsWith('mod')) {
            const modNum = parseInt(targetId.replace('mod', ''));
            if (!isNaN(modNum)) {
                setTimeout(() => {
                    markModuleComplete(modNum);
                }, 4000);
            }
        }
    };

    // Sidebar navigation bindings
    navItems.forEach(item => {
        const target = item.getAttribute('data-target');
        if (target) {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                window.navigateTo(target);
            });
        }
    });

    // Mark module complete
    function markModuleComplete(modNum) {
        if (!completedModules.includes(modNum)) {
            completedModules.push(modNum);
            localStorage.setItem('mundonet_academy_progress', JSON.stringify(completedModules));
            updateProgressUI();
        }
    }

    // Update progress tracking UI
    function updateProgressUI() {
        const percentage = Math.round((completedModules.length / totalModules) * 100);
        if (progressText) progressText.textContent = `${percentage}%`;
        if (progressFill) progressFill.style.width = `${percentage}%`;

        // Update checklist ticks in sidebar
        navItems.forEach(item => {
            const target = item.getAttribute('data-target');
            if (target && target.startsWith('mod')) {
                const modNum = parseInt(target.replace('mod', ''));
                if (completedModules.includes(modNum)) {
                    item.classList.add('completed');
                }
            }
        });
    }

    // Initialize progress on boot
    updateProgressUI();

    // Set student name if present
    const savedName = localStorage.getItem('novato_student_name');
    if (savedName) {
        document.querySelector('.user-name').textContent = savedName;
    }


    // ==========================================
    // INTERACTIVE SIMULATIONS LOGIC
    // ==========================================

    // --- MODULE 1: PACKET SENDER SIMULATION ---
    const packetBtn = document.getElementById('packet-send-btn');
    const packetEl = document.getElementById('sim-packet');
    const packetLogs = document.getElementById('sim-logs');
    const pc1Node = document.getElementById('pc1-node');
    const pc2Node = document.getElementById('pc2-node');

    if (packetBtn) {
        packetBtn.addEventListener('click', () => {
            if (packetEl.style.display === 'block') return; // Prevent spamming
            
            packetBtn.disabled = true;
            packetBtn.textContent = 'Enviando...';
            packetLogs.innerHTML = `<span style="color:var(--accent)">[ENVIO] Criando pacote TCP/IP...</span><br>`;
            
            pc1Node.classList.add('active');
            
            setTimeout(() => {
                packetEl.style.display = 'block';
                packetEl.style.left = '90px';
                packetLogs.innerHTML += `<span>[ENVIO] Pacote enviado na rede física. (1500 bytes)</span><br>`;
                
                // Animate packet to the server
                let pos = 90;
                const anim = setInterval(() => {
                    if (pos >= 350) {
                        clearInterval(anim);
                        packetArrived();
                    } else {
                        pos += 10;
                        packetEl.style.left = `${pos}px`;
                    }
                }, 30);
            }, 800);
        });
    }

    function packetArrived() {
        pc2Node.classList.add('active');
        packetLogs.innerHTML += `<span style="color:var(--success)">[RECEBIMENTO] Pacote chegou no Servidor!</span><br>`;
        packetLogs.innerHTML += `<span>[RECEBIMENTO] Enviando confirmação (ACK) de volta...</span><br>`;
        
        setTimeout(() => {
            packetEl.style.display = 'none';
            pc1Node.classList.remove('active');
            pc2Node.classList.remove('active');
            packetBtn.disabled = false;
            packetBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar Pacote';
            packetLogs.innerHTML += `<span style="color:var(--success)">[SUCESSO] Comunicação finalizada! Ping: 14ms</span><br>`;
            packetLogs.scrollTop = packetLogs.scrollHeight;
        }, 1200);
    }


    // --- MODULE 2: INTERNET PATH TRACER AND TRANSMISSION PIPELINE ---
    window.selectPipelineStep = (stepNum) => {
        const idx = stepNum - 1;
        const tracerData = [
            {
                title: "1. O Cliente (O Pedido)",
                desc: "Você está no seu celular e digita 'youtube.com'. O celular é o CLIENTE. Ele cria uma requisição (um pedido) perguntando ao site do YouTube pelo vídeo. Ele envia essa requisição pelo ar até o roteador Wi-Fi."
            },
            {
                title: "2. O Provedor (A Rota Local)",
                desc: "O Roteador da sua casa traduz o Wi-Fi e envia esse pacote de dados pela fibra óptica da sua rua até a central da MundoNet (nosso Provedor). Nós somos a primeira ponte que conecta você com o restante do planeta!"
            },
            {
                title: "3. O Backbone (A Autoestrada da Internet)",
                desc: "A MundoNet entrega o pacote para as gigantes telecomunicações chamadas Backbones (espinha dorsal). São cabos submarinos transoceânicos gigantescos e fibras de alta velocidade que conectam países e continentes. Os dados viajam na velocidade da luz por essas rotas!"
            },
            {
                title: "4. O Servidor (A Entrega)",
                desc: "O pacote chega no datacenter do Google/YouTube (o SERVIDOR). O servidor processa o pedido, localiza o vídeo solicitado, o empacota em milhares de pedacinhos e manda de volta pelo mesmo caminho. O ciclo se completa e o vídeo abre na sua tela!"
            }
        ];

        const tracerTitle = document.getElementById('tracer-title');
        const tracerDesc = document.getElementById('tracer-desc');
        if (tracerTitle && tracerDesc) {
            tracerTitle.innerHTML = `<i class="fa-solid fa-circle-info" style="font-size:1.15rem;"></i> ${tracerData[idx].title}`;
            tracerDesc.textContent = tracerData[idx].desc;
        }

        // Highlight nodes
        for (let i = 1; i <= 4; i++) {
            const node = document.getElementById(`pipeline-node-${i}`);
            const stepBtn = document.getElementById(`tracer-step-${i}`);
            if (node) {
                node.classList.remove('active', 'completed');
                if (i < stepNum) {
                    node.classList.add('completed');
                } else if (i === stepNum) {
                    node.classList.add('active');
                }
            }
            if (stepBtn) {
                stepBtn.classList.remove('active', 'completed');
                if (i < stepNum) {
                    stepBtn.classList.add('completed');
                } else if (i === stepNum) {
                    stepBtn.classList.add('active');
                }
            }
        }

        // Animate dynamic active cable width
        const activeCable = document.getElementById('pipeline-cables-active');
        if (activeCable) {
            activeCable.style.width = (idx * 33.33) + '%';
        }

        // Centered responsive packet calculation
        const packet = document.getElementById('pipeline-packet');
        const targetNode = document.getElementById(`pipeline-node-${stepNum}`);
        const network = document.querySelector('.pipeline-network');
        if (packet && targetNode && network) {
            const netRect = network.getBoundingClientRect();
            const nodeRect = targetNode.getBoundingClientRect();
            const leftOffset = nodeRect.left - netRect.left + (nodeRect.width / 2) - 7;
            packet.style.left = leftOffset + 'px';
        }
    };

    window.addEventListener('resize', () => {
        const activeNode = document.querySelector('.pipeline-node.active');
        if (activeNode) {
            const stepNum = parseInt(activeNode.id.replace('pipeline-node-', ''));
            window.selectPipelineStep(stepNum);
        }
    });

    // Auto initialize pipeline step 1
    setTimeout(() => {
        if (document.getElementById('pipeline-packet')) {
            window.selectPipelineStep(1);
        }
    }, 150);


    // --- MODULE 3: DNS TRANSLATOR TOOL ---
    const dnsInput = document.getElementById('dns-input');
    const dnsBtn = document.getElementById('dns-translate-btn');
    const dnsQuery = document.getElementById('dns-query-line');
    const dnsIp = document.getElementById('dns-ip-resolved');

    const dnsDatabase = {
        'google.com': { ipv4: '142.250.218.206', ipv6: '2607:f8b0:4004:837::200e' },
        'youtube.com': { ipv4: '142.250.191.238', ipv6: '2607:f8b0:4004:82f::200e' },
        'netflix.com': { ipv4: '54.237.226.120', ipv6: '2607:f8b0:4004:82f::3010' },
        'facebook.com': { ipv4: '157.240.22.35', ipv6: '2a03:2880:f12f:83:face:b00c::' },
        'mundonet.com.br': { ipv4: '100.65.12.80', ipv6: '2001:db8:mnd:99::1' }
    };

    if (dnsBtn) {
        dnsBtn.addEventListener('click', () => {
            let domain = dnsInput.value.trim().toLowerCase();
            // remove http:// or www. if added
            domain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');
            
            dnsQuery.innerHTML = `<span style="color:var(--text-muted)">Consultando Servidor DNS (8.8.8.8)...</span>`;
            dnsIp.textContent = "Buscando...";

            setTimeout(() => {
                if (dnsDatabase[domain]) {
                    dnsQuery.innerHTML = `<span style="color:var(--success)">[DNS ENCONTRADO] Tradução para "${domain}" efetuada:</span>`;
                    dnsIp.innerHTML = `IPv4: ${dnsDatabase[domain].ipv4}<br><span style="font-size:0.8rem;color:var(--text-muted)">IPv6: ${dnsDatabase[domain].ipv6}</span>`;
                } else {
                    // Generate random IP to make it realistic
                    const r1 = Math.floor(Math.random() * 220) + 1;
                    const r2 = Math.floor(Math.random() * 254);
                    const r3 = Math.floor(Math.random() * 254);
                    const r4 = Math.floor(Math.random() * 254);
                    const randomIp = `${r1}.${r2}.${r3}.${r4}`;
                    dnsQuery.innerHTML = `<span style="color:var(--warning)">[DNS NOVO] Registrado dinamicamente:</span>`;
                    dnsIp.innerHTML = `IPv4: ${randomIp}<br><span style="font-size:0.8rem;color:var(--text-muted)">IPv6: 2001:db8:rand:${r1}::55</span>`;
                }
            }, 1000);
        });
    }


    // --- MODULE 4: HARDWARE CATALOG SPEC ---
    const hwTabs = document.querySelectorAll('.hw-tab');
    const hwTitle = document.getElementById('hw-title');
    const hwDesc = document.getElementById('hw-desc');
    const ledContainer = document.getElementById('hw-leds');

    const hwCatalogData = {
        'modem': {
            title: "Modem / ONT",
            desc: "Dispositivo primário que decodifica o sinal de luz do cabo de fibra óptica ou ondas de rádio em pulsos digitais elétricos de rede local.",
            leds: [
                { name: "Power", status: "green", desc: "Aparelho ligado na eletricidade." },
                { name: "Optical/PON", status: "green", desc: "Sinal de fibra óptica calibrado e respondendo na OLT." }
            ]
        },
        'roteador': {
            title: "Roteador Wireless",
            desc: "Ponto central da rede doméstica do cliente. Recebe o sinal de internet, faz a autenticação de login (PPPoE), cria e gerencia o sinal de Wi-Fi (2.4GHz e 5GHz) e distribui endereços IPs locais (DHCP) para celulares, TVs e computadores.",
            leds: [
                { name: "Power", status: "green", desc: "Equipamento energizado." },
                { name: "WAN/Internet", status: "green", desc: "Conexão PPPoE estabelecida e navegando na rede mundial." },
                { name: "WLAN 2.4G/5G", status: "green", desc: "Transmissor Wi-Fi ativo enviando sinais pelo ar." }
            ]
        },
        'switch': {
            title: "Switch (Comutador)",
            desc: "Multiplicador de conexões cabeadas de alta velocidade. Pense nele como uma extensão elétrica, mas para cabos de rede RJ45. Ideal para conectar computadores, consoles de videogame e TVs de uma vez só sem perda de desempenho ou latência.",
            leds: [
                { name: "Power", status: "green", desc: "Ligado na tomada." },
                { name: "Portas 1-8", status: "green", desc: "Mostra quais portas têm computadores conectados e enviando pacotes." }
            ]
        },
        'ap': {
            title: "Access Point (Ponto de Acesso)",
            desc: "Equipamento complementar utilizado em residências grandes ou escritórios. Conectado ao roteador principal via cabo de rede, ele emite um novo ponto forte de Wi-Fi em cômodos distantes para eliminar as zonas mortas (áreas sem sinal devido a paredes ou barreiras).",
            leds: [
                { name: "Power", status: "green", desc: "Energizado." },
                { name: "Signal Strength", status: "green", desc: "Nível de sinal óptimo recebido do roteador central." }
            ]
        },
        'onu': {
            title: "ONU / OLT (Fibra Óptica)",
            desc: "ONU (Unidade de Rede Óptica) fica na casa do cliente recebendo o cabo preto. OLT (Terminal de Linha Óptica) fica na central do provedor (MundoNet) gerenciando milhares de ONUs. Se a OLT desliga, um bairro inteiro perde a internet.",
            leds: [
                { name: "PON (Luz de Sinal)", status: "green", desc: "Fibra conectada perfeitamente na central." },
                { name: "LOS (Vermelho Alarme)", status: "red-blink", desc: "FIO ROMPIDO ou conector desconectado. Sem sinal óptico." }
            ]
        }
    };

    hwTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-hw');
            hwTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const item = hwCatalogData[tabId];
            hwTitle.textContent = item.title;
            hwDesc.textContent = item.desc;

            // Render leds
            ledContainer.innerHTML = '';
            item.leds.forEach(led => {
                ledContainer.innerHTML += `
                    <div class="hw-light-row">
                        <div class="led-indicator ${led.status}"></div>
                        <div>
                            <strong>${led.name}:</strong> 
                            <span style="font-size:0.75rem; color:var(--text-muted);">${led.desc}</span>
                        </div>
                    </div>
                `;
            });
        });
    });


    // --- MODULE 5: OPTICAL BUDGET POWER CALCULATOR ---
    const optSlider = document.getElementById('optical-slider');
    const optPower = document.getElementById('optical-power');
    const optStatus = document.getElementById('optical-status');
    const optDesc = document.getElementById('optical-desc');

    if (optSlider) {
        optSlider.addEventListener('input', () => {
            const val = parseInt(optSlider.value);
            optPower.textContent = `${val} dBm`;

            if (val >= -25) {
                optPower.className = "text-success";
                optStatus.textContent = "PON (Excelente)";
                optStatus.className = "text-success font-bold";
                optDesc.textContent = "Sinal ideal! A luz está perfeita. A ONU sincronizará de forma instantânea na OLT e a conexão funcionará sem lentidão ou quedas.";
            } else if (val < -25 && val >= -28) {
                optPower.className = "text-warning";
                optStatus.textContent = "Atenuado (Alerta)";
                optStatus.className = "text-warning font-bold";
                optDesc.textContent = "Sinal fraco. A internet funciona, mas pode sofrer com perdas de pacotes intermitentes durante picos de uso. Geralmente causado por poeira no conector ou dobras na fibra.";
            } else {
                optPower.className = "text-danger";
                optStatus.textContent = "LOS (Offline / Sem Sinal)";
                optStatus.className = "text-danger font-bold";
                optDesc.textContent = "SINAL MUITO FRACO OU INEXISTENTE! Luz LOS piscando vermelho. Cabo rompido na rua, quebrado dentro de casa ou esticado demais. Requer envio de equipe técnica.";
            }
        });
    }


    // --- MODULE 6: WI-FI FREQUENCY SELECTOR SIM ---
    const wifiBtns = document.querySelectorAll('.wifi-toggle-btn');
    const wifiWaves = document.getElementById('wifi-waves');
    const wifiRangeVal = document.getElementById('wifi-range-val');
    const wifiSpeedVal = document.getElementById('wifi-speed-val');
    const wifiExplain = document.getElementById('wifi-explain');
    const clientDevice = document.getElementById('client-device');
    const clientSignalText = document.getElementById('client-signal-text');

    const wifiSpecs = {
        '24': {
            range: "Até 70 metros (Ótimo alcance)",
            speed: "Cerca de 50 - 90 Mbps",
            signal: "Forte (Rede 2.4Ghz)",
            deviceIcon: "fa-solid fa-wifi text-success",
            wavesHtml: '<div class="wifi-wave-ring" style="animation-duration:3.5s; border-color:var(--success)"></div><div class="wifi-wave-ring" style="animation-duration:3.5s; animation-delay:1.1s; border-color:var(--success)"></div>',
            explain: "<strong>Frequência 2.4GHz:</strong> Ondas mais longas e espessas. Passam facilmente por paredes de concreto, espelhos e portas. Ideal para cobrir a casa toda, mas a velocidade máxima é baixa e sofre com interferência de aparelhos sem fio vizinhos e micro-ondas."
        },
        '5': {
            range: "Até 15 metros (Curto alcance)",
            speed: "Cerca de 300 - 600+ Mbps (Máxima)",
            signal: "Muito Fraco / Sem Sinal",
            deviceIcon: "fa-solid fa-wifi text-danger",
            wavesHtml: '<div class="wifi-wave-ring" style="animation-duration:1.5s; border-color:var(--danger)"></div><div class="wifi-wave-ring" style="animation-duration:1.5s; animation-delay:0.5s; border-color:var(--danger)"></div>',
            explain: "<strong>Frequência 5GHz:</strong> Ondas extremamente curtas e rápidas. Permitem velocidades altíssimas para streaming 4K e downloads robustos. No entanto, <strong>não conseguem atravessar paredes</strong>. Se você fechar a porta do quarto e ir para outro cômodo, o sinal cairá drasticamente ou sumirá!"
        }
    };

    wifiBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const freq = btn.getAttribute('data-freq');
            wifiBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const item = wifiSpecs[freq];
            wifiRangeVal.textContent = item.range;
            wifiSpeedVal.textContent = item.speed;
            clientSignalText.textContent = item.signal;
            clientDevice.className = item.deviceIcon;
            wifiWaves.innerHTML = item.wavesHtml;
            wifiExplain.innerHTML = item.explain;
        });
    });


    // --- MODULE 7: SIMULATED TERMINAL ---
    const termInput = document.getElementById('term-cmd-input');
    const termOutput = document.getElementById('terminal-output');
    const termBtn = document.getElementById('term-send-btn');

    if (termBtn && termInput) {
        const executeCmd = () => {
            const cmd = termInput.value.trim();
            if (cmd === '') return;
            
            termInput.value = '';
            termOutput.innerHTML += `<div style="color:#ffffff">> ${cmd}</div>`;
            
            const parts = cmd.toLowerCase().split(' ');
            const main = parts[0];

            if (main === 'clear') {
                termOutput.innerHTML = '';
                return;
            }

            if (main === 'help') {
                termOutput.innerHTML += `
                    <div>Comandos disponíveis:</div>
                    <div style="color:var(--accent)"> - help : Mostra os comandos</div>
                    <div style="color:var(--accent)"> - ping [IP/Site] : Testa latência de rede</div>
                    <div style="color:var(--accent)"> - tracert [IP/Site] : Rastreia a rota física de pacotes</div>
                    <div style="color:var(--accent)"> - clear : Limpa a tela</div>
                `;
            } else if (main === 'ping') {
                const target = parts[1] || '8.8.8.8';
                termOutput.innerHTML += `<div>Disparando contra ${target} com 32 bytes de dados:</div>`;
                
                let count = 0;
                const interval = setInterval(() => {
                    if (count >= 4) {
                        clearInterval(interval);
                        termOutput.innerHTML += `
                            <div style="color:var(--success)">Estatísticas do Ping para ${target}:</div>
                            <div>  Pacotes: Enviados = 4, Recebidos = 4, Perdidos = 0 (0% de perda)</div>
                            <div>Aproximar tempo de ida e volta: Min = 12ms, Max = 16ms, Média = 13ms</div>
                        `;
                        termOutput.scrollTop = termOutput.scrollHeight;
                    } else {
                        const ms = Math.floor(Math.random() * 8) + 11;
                        termOutput.innerHTML += `<div>Resposta de ${target}: bytes=32 tempo=${ms}ms TTL=56</div>`;
                        termOutput.scrollTop = termOutput.scrollHeight;
                        count++;
                    }
                }, 400);
            } else if (main === 'tracert') {
                const target = parts[1] || 'mundonet.com.br';
                termOutput.innerHTML += `<div>Rastreando a rota para ${target} com no máximo 30 saltos:</div>`;
                
                const hops = [
                    `1    <1 ms    <1 ms    <1 ms  192.168.1.1 (Gateway Local)`,
                    `2    3 ms     2 ms     2 ms   10.100.0.1 (OLT Concentradora - MundoNet)`,
                    `3    5 ms     6 ms     5 ms   100.65.0.254 (Servidor Core BGP - MundoNet)`,
                    `4    12 ms    12 ms    11 ms  200.220.14.80 (Trânsito IP Embratel - SP)`,
                    `5    14 ms    13 ms    14 ms  ${target} (Destino Final)`
                ];
                
                let hopIdx = 0;
                const interval = setInterval(() => {
                    if (hopIdx >= hops.length) {
                        clearInterval(interval);
                        termOutput.innerHTML += `<div style="color:var(--success)">Rastreamento de Rota Completo.</div>`;
                        termOutput.scrollTop = termOutput.scrollHeight;
                    } else {
                        termOutput.innerHTML += `<div>  ${hops[hopIdx]}</div>`;
                        termOutput.scrollTop = termOutput.scrollHeight;
                        hopIdx++;
                    }
                }, 500);
            } else {
                termOutput.innerHTML += `<div style="color:var(--danger)">Comando desconhecido. Digite 'help' para comandos válidos.</div>`;
            }
            termOutput.scrollTop = termOutput.scrollHeight;
        };

        termBtn.addEventListener('click', executeCmd);
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') executeCmd();
        });
    }


    // --- MODULE 8: TECHNICIAN DECISION TREE ---
    const techOptions = document.querySelectorAll('.tech-option');
    const techOutcomeTitle = document.getElementById('tech-outcome-title');
    const techOutcomeDesc = document.getElementById('tech-outcome-desc');
    const techResultBox = document.getElementById('tech-result-box');

    let techTreeState = { q1: null, q2: null };

    techOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const group = opt.getAttribute('data-group');
            const val = opt.getAttribute('data-val');

            // Select visual state
            document.querySelectorAll(`.tech-option[data-group="${group}"]`).forEach(o => o.classList.remove('active'));
            opt.classList.add('active');

            techTreeState[group] = val;

            evaluateTechTree();
        });
    });

    function evaluateTechTree() {
        if (!techTreeState.q1 || !techTreeState.q2) return;
        
        techResultBox.style.display = 'block';

        if (techTreeState.q1 === 'los' && techTreeState.q2 === 'offline') {
            techOutcomeTitle.textContent = "🔴 O.S. DE REPARO FÍSICO (CABO ROMPIDO)";
            techOutcomeTitle.className = "text-danger font-bold";
            techOutcomeDesc.textContent = "A luz vermelha (LOS) piscando e o status offline indicam rompimento da fibra óptica. O atendente deve abrir um chamado para equipe técnica externa (técnico de rua) fazer a fusão ou a troca do cabo drop.";
        } 
        else if (techTreeState.q1 === 'green' && techTreeState.q2 === 'bloqueado') {
            techOutcomeTitle.textContent = "🟡 PENDÊNCIA FINANCEIRA (IP 172 BLOQUEADO)";
            techOutcomeTitle.className = "text-warning font-bold";
            techOutcomeDesc.textContent = "Luzes perfeitas (PON ativas) mas sem navegar devido ao IP bloqueio temporário por atraso de pagamento no sistema. Mande o boleto via WhatsApp e conceda o 'Desbloqueio de Confiança' caso habilitado!";
        }
        else if (techTreeState.q1 === 'green' && techTreeState.q2 === 'lento') {
            techOutcomeTitle.textContent = "🔵 ORIENTAÇÃO DE USO DO WI-FI (2.4Ghz vs 5Ghz)";
            techOutcomeTitle.className = "text-primary font-bold";
            techOutcomeDesc.textContent = "A internet está chegando perfeitamente na fibra. O cliente está sofrendo lentidão por estar conectado ao rádio de 2.4Ghz ou distante do roteador. Ensine as limitações do Wi-Fi e oriente a mudar para o 5Ghz ou usar cabo de rede.";
        }
        else {
            techOutcomeTitle.textContent = "🟢 PROBLEMA CONFIGURAÇÃO / DNS INTERNO";
            techOutcomeTitle.className = "text-success font-bold";
            techOutcomeDesc.textContent = "As luzes do aparelho estão normais e ele está online na central, porém desconectado. Pode ser um cabo desconectado entre a ONU e o roteador, ou roteador resetado. Mande ele retirar o roteador da tomada por 10 segundos.";
        }
    }


    // --- MODULE 9: NOC SPARKLINES SIM ---
    const latencyNoc = document.getElementById('noc-latency-val');
    const usageNoc = document.getElementById('noc-usage-val');
    const alarmsContainer = document.getElementById('noc-alarm-list');

    let latencyDataPoints = [15, 14, 16, 15, 17, 14, 15];
    let usageDataPoints = [72, 74, 76, 75, 78, 79, 81];

    function updateNocMetrics() {
        if (!latencyNoc || !usageNoc) return;
        
        // Add random fluctuation
        const latChange = Math.floor(Math.random() * 3) - 1;
        let lastLat = latencyDataPoints[latencyDataPoints.length - 1] + latChange;
        if (lastLat < 10) lastLat = 10;
        if (lastLat > 95) lastLat = 95;
        latencyDataPoints.push(lastLat);
        latencyDataPoints.shift();

        const useChange = Math.floor(Math.random() * 4) - 1;
        let lastUse = usageDataPoints[usageDataPoints.length - 1] + useChange;
        if (lastUse < 40) lastUse = 40;
        if (lastUse > 99) lastUse = 99;
        usageDataPoints.push(lastUse);
        usageDataPoints.shift();

        latencyNoc.textContent = `${lastLat} ms`;
        usageNoc.textContent = `${lastUse} Gbps`;

        // Sparklines update
        document.getElementById('lat-spark').innerHTML = generateSparkline(latencyDataPoints, '#06b6d4');
        document.getElementById('use-spark').innerHTML = generateSparkline(usageDataPoints, '#a855f7');

        // Dynamic Alarms
        alarmsContainer.innerHTML = '';
        if (lastLat > 35) {
            alarmsContainer.innerHTML += `<div style="color:var(--danger)">⚠️ [ALERTA] Alta latência detectada no Trânsito IP!</div>`;
        }
        if (lastUse > 85) {
            alarmsContainer.innerHTML += `<div style="color:var(--warning)">⚠️ [NOC] Consumo do link excedeu 85% de banda!</div>`;
        }
        if (alarmsContainer.innerHTML === '') {
            alarmsContainer.innerHTML = `<div style="color:var(--success)">✅ Todos os links principais operando com estabilidade.</div>`;
        }
    }

    function generateSparkline(points, color) {
        const width = 180;
        const height = 40;
        const maxVal = 100;
        
        let path = `M 0 ${height - (points[0] / maxVal * height)}`;
        for(let i = 1; i < points.length; i++) {
            const x = (i / (points.length - 1)) * width;
            const y = height - (points[i] / maxVal * height);
            path += ` L ${x} ${y}`;
        }

        return `
            <svg width="${width}" height="${height}">
                <path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" />
            </svg>
        `;
    }

    setInterval(updateNocMetrics, 3000);


    // ==========================================
    // 10-QUESTION GAMIFIED QUIZ SYSTEM
    // ==========================================

    const quizQuestions = [
        {
            q: "Qual o princípio central por trás do funcionamento de qualquer rede de computadores?",
            options: [
                "Exigir faturas pagas e contas ativas no sistema central.",
                "Estabelecer comunicação entre dispositivos que trocam informações organizadas em pacotes.",
                "Ter roteadores da fabricante Huawei instalados nas ruas."
            ],
            correct: 1
        },
        {
            q: "A Dona Maria reclama que a internet caiu, mas na ONU as luzes PON e LAN estão verdes fixas. O que pode ser?",
            options: [
                "O cabo drop da rua está quebrado por completo.",
                "Bloqueio financeiro (IP 172) ou falta de pagamento temporário.",
                "A fonte de alimentação da ONU queimou."
            ],
            correct: 1
        },
        {
            q: "Como funciona a analogia didática do 'Regador e da Água' para explicar a diferença de Internet vs Wi-Fi?",
            options: [
                "A Internet é o regador e o Wi-Fi é a água que corre pelo cabo elétrico.",
                "A internet é a água chegando do cano da rua, enquanto o Wi-Fi é o regador que espalha essa água pelo ar da casa.",
                "O Wi-Fi é a caixa d'água principal da MundoNet e a internet é o cano de vidro."
            ],
            correct: 1
        },
        {
            q: "No sistema IXC Soft, o que o atendente deve fazer após o cliente efetuar o pagamento do boleto bloqueado?",
            options: [
                "Mandar a equipe de suporte externo trocar o roteador na residência.",
                "Clicar em 'Desconectar' na aba PPPoE do cliente e apagar o IP '172.' para puxar o IP padrão de navegação.",
                "Exigir que o cliente insira um palito no buraquinho de reset físico."
            ],
            correct: 1
        },
        {
            q: "O que a luz vermelha LOS piscando de forma contínua no aparelho ONU/ONT indica de imediato?",
            options: [
                "Aparelho atualizando o firmware remotamente via protocolo TR-069.",
                "Equipamento desconectado da tomada ou queimado.",
                "Emergência! Falha física ou rompimento no cabo de fibra óptica."
            ],
            correct: 2
        },
        {
            q: "Qual a diferença crítica entre as bandas Wi-Fi de 2.4GHz e 5GHz?",
            options: [
                "A rede 2.4GHz é exclusiva para iPhones e a 5GHz é para TVs 4K e computadores Windows.",
                "A rede 2.4GHz tem maior velocidade e curto alcance; a rede 5GHz atravessa paredes mas é lenta.",
                "A rede 2.4GHz tem maior alcance e atravessa paredes (lenta); a rede 5GHz entrega altíssima velocidade mas tem curto alcance."
            ],
            correct: 2
        },
        {
            q: "Um gamer de Free Fire reclama de constantes travadas. Ele contratou 500 Megas. Por que isso acontece?",
            options: [
                "O provedor está limitando os Megas dele.",
                "Joguinhos dependem do Ping (tempo de ida e volta do pacote/latência). Megas altos (Caminhão) não impedem engarrafamentos da rota até o jogo (Ping alto).",
                "O cabo drop dele quebrou e a luz vermelha está apagada."
            ],
            correct: 1
        },
        {
            q: "O que é o DNS (Domain Name System) e qual sua utilidade na internet?",
            options: [
                "O protocolo de login e senha para conexão automática PPPoE.",
                "A agenda telefônica da internet. Traduz domínios em texto (como google.com) em endereços IPs numéricos legíveis para computadores.",
                "O servidor central da MundoNet que distribui sinais de fibra óptica."
            ],
            correct: 1
        },
        {
            q: "Para que serve a máscara de rede (subnet mask)?",
            options: [
                "Proteger os roteadores contra poeira e danos climáticos.",
                "Separar a parte de rede e a parte de hosts de um endereço IP.",
                "Limitar a banda de download de planos mais baixos no iMaster NCE."
            ],
            correct: 1
        },
        {
            q: "Qual ferramenta o NOC utiliza para acompanhar graficamente o consumo de tráfego, latência geral e alarmes em tempo real?",
            options: [
                "IXC Soft aba financeiro.",
                "Zabbix, PRTG, Grafana ou Smokeping.",
                "Testes locais de Speedtest."
            ],
            correct: 1
        }
    ];

    let currentQ = 0;
    let userAnswers = [];
    
    window.startQuiz = () => {
        const nameInput = document.getElementById('student-name-input');
        if (nameInput && nameInput.value.trim() !== '') {
            localStorage.setItem('novato_student_name', nameInput.value.trim());
            document.querySelector('.user-name').textContent = nameInput.value.trim();
        } else {
            localStorage.setItem('novato_student_name', 'Novato');
        }

        document.getElementById('quiz-welcome').style.display = 'none';
        document.getElementById('quiz-card').style.display = 'block';
        currentQ = 0;
        userAnswers = [];
        showQuestion();
    };

    function showQuestion() {
        const item = quizQuestions[currentQ];
        document.getElementById('quiz-q-num').textContent = `Questão ${currentQ + 1} de ${quizQuestions.length}`;
        document.getElementById('quiz-question-text').textContent = item.q;

        const list = document.getElementById('quiz-options');
        list.innerHTML = '';

        item.options.forEach((opt, idx) => {
            list.innerHTML += `
                <label class="quiz-option-label" onclick="selectQuizOption(${idx})">
                    <input type="radio" name="quiz-opt" value="${idx}">
                    <span>${opt}</span>
                </label>
            `;
        });
    }

    window.selectQuizOption = (idx) => {
        // Toggle visual state
        document.querySelectorAll('.quiz-option-label').forEach((lbl, lIdx) => {
            lbl.classList.remove('selected');
            const radio = lbl.querySelector('input');
            if (lIdx === idx) {
                lbl.classList.add('selected');
                radio.checked = true;
            }
        });
    };

    window.nextQuizQuestion = () => {
        const checked = document.querySelector('input[name="quiz-opt"]:checked');
        if (!checked) {
            alert("Selecione uma resposta antes de avançar!");
            return;
        }

        userAnswers.push(parseInt(checked.value));

        if (currentQ < quizQuestions.length - 1) {
            currentQ++;
            showQuestion();
        } else {
            finishQuiz();
        }
    };

    function finishQuiz() {
        document.getElementById('quiz-card').style.display = 'none';
        document.getElementById('quiz-ended').style.display = 'block';

        let score = 0;
        quizQuestions.forEach((q, idx) => {
            if (userAnswers[idx] === q.correct) score++;
        });

        const scoreText = document.getElementById('quiz-score-summary');
        scoreText.textContent = `Você acertou ${score} de ${quizQuestions.length} questões.`;

        const name = localStorage.getItem('novato_student_name') || 'Novato';

        if (score >= 8) {
            document.getElementById('cert-student-name').textContent = name;
            document.getElementById('cert-date').textContent = new Date().toLocaleDateString('pt-BR');
            document.getElementById('cert-success-box').style.display = 'block';
            document.getElementById('cert-failure-box').style.display = 'none';
        } else {
            document.getElementById('cert-success-box').style.display = 'none';
            document.getElementById('cert-failure-box').style.display = 'block';
        }
    }

    // --- INTERACTIVE TOPOLOGY ZOOM SYSTEM ---
    const zoomData = {
        'internet': {
            title: "1. Internet & Trânsito BGP",
            badge: "Core Global",
            desc: "A porta de entrada de toda a informação mundial para dentro da rede MundoNet. Nossos servidores BGP fazem conexões de tráfego ultra rápidas com operadoras nacionais e internacionais e com o IX.br (Ponto de Troca de Tráfego) em São Paulo para acessar grandes datacenters diretamente.",
            img: "images/zabbix.png",
            specs: [
                { label: "Capacidade de Link", value: "800+ Gbps" },
                { label: "Redundância", value: "Ativa (Múltiplas Fibras)" },
                { label: "Protocolo de Borda", value: "BGP4 (Rotas Dinâmicas)" }
            ],
            tipTitle: "Orientação do NOC",
            tipDesc: "Em caso de lentidão generalizada para sites específicos (como Netflix ou Instagram), verifique o gráfico de consumo de trânsito ou latência na CDN antes de culpar o roteador do cliente."
        },
        'olt': {
            title: "2. OLT (Optical Line Terminal)",
            badge: "Central do Provedor",
            desc: "O 'coração luminoso' de nossa infraestrutura de rede. Localizada no Data Center central da MundoNet, a OLT é a responsável por gerar a luz laser invisível que viaja pelas fibras da cidade, controlando os logins PPPoE e monitorando todas as conexões ativas.",
            img: "images/unm2000.png",
            specs: [
                { label: "Tecnologia Óptica", value: "GPON / XG-PON" },
                { label: "Portas PON por Chassi", value: "De 16 a 128 portas" },
                { label: "Clientes por Porta", value: "Até 64/128 conexões" }
            ],
            tipTitle: "Regra do NOC",
            tipDesc: "Alarmes de 'Dying Gasp' na OLT indicam queda repentina de energia elétrica em algum armário ou repetidor, afetando múltiplos clientes de uma só vez."
        },
        'cto': {
            title: "3. Caixa CTO (Poste)",
            badge: "Distribuição na Rua",
            desc: "A Caixa CTO (Caixa de Terminação Óptica) é o ponto físico de distribuição localizado nos postes da rua. Ela recebe a fibra principal vinda da central e a divide, usando um Splitter passivo (sem eletricidade), em 8 ou 16 conexões para enviar cabos drops pretos até os clientes.",
            img: "images/didactic_ftth.png",
            specs: [
                { label: "Tipo de Splitter", value: "1x16 balanceado" },
                { label: "Atenuação de Luz Média", value: "-14 dBm" },
                { label: "Vedação Climática", value: "IP65 (Anti-chuva e poeira)" }
            ],
            tipTitle: "Suporte Prático",
            tipDesc: "Sempre verifique se vizinhos do mesmo poste estão sem navegar para confirmar se a falha é local no cliente ou se foi provocada por um caminhão que arrebentou a fibra da rua."
        },
        'onu': {
            title: "4. ONU / ONT",
            badge: "Entrada da Casa",
            desc: "O conversor óptico digital do cliente. A ONU (Optical Network Unit) recebe o cabo preto de fibra óptica e decodifica a luz laser invisível em pulsos elétricos de rede local LAN Gigabit (cabo de rede RJ45) para alimentar o roteador Wi-Fi.",
            img: "images/onu_lights.png",
            specs: [
                { label: "Sinal Óptico Excelente", value: "-15 a -25 dBm" },
                { label: "Sinal Degradado / Ruim", value: "-28 a -35 dBm" },
                { label: "Luz LOS piscando", value: "Rompimento / Sem luz óptica" }
            ],
            tipTitle: "Luzes de Diagnóstico",
            tipDesc: "LED PON aceso fixo verde indica sincronia perfeita com a central. LED LOS piscando vermelho significa perda total de sinal por conector quebrado ou fibra rompida na rua."
        },
        'router': {
            title: "5. Roteador Wi-Fi",
            badge: "Distribuição Local",
            desc: "O cérebro digital da residência. Recebe a internet da ONU, autentica o login PPPoE do cliente, distribui endereços IPs locais automáticos (DHCP) e transmite o sinal de rádio Wi-Fi Dual-Band nas frequências de 2.4GHz e 5GHz.",
            img: "images/mesh.png",
            specs: [
                { label: "Frequência 2.4GHz", value: "Maior alcance / Menor velocidade" },
                { label: "Frequência 5GHz", value: "Curto alcance / Altíssima velocidade" },
                { label: "Segurança de Acesso", value: "WPA2 / WPA3 Personal" }
            ],
            tipTitle: "Instrução de Ouro",
            tipDesc: "Nunca mande o cliente resetar o roteador no buraquinho de reset físico. Isso apaga todas as senhas de conexão e obriga a enviar um técnico à residência para reconfiguração."
        },
        'devices': {
            title: "6. Aparelhos Finais",
            badge: "Consumo de Banda",
            desc: "Smartphones, TVs 4K, consoles de jogos e notebooks conectados na ponta final da rede. Cada um desses aparelhos gera requisições de pacotes de dados no modelo Cliente-Servidor para abrir vídeos, páginas ou jogos.",
            img: "images/didactic_support.png",
            specs: [
                { label: "Conexão via Cabo UTP", value: "100% Estável / Sem interferência" },
                { label: "Conexão via Wi-Fi", value: "Sujeito a oscilações aéreas e barreiras" },
                { label: "Recomendação de Uso", value: "Cabo para consoles e TVs 4K" }
            ],
            tipTitle: "Diagnóstico Rápido",
            tipDesc: "Gamer reclamando de travas no jogo mesmo tendo 500 Megas contratados? A causa é oscilação aérea no Wi-Fi. Recomende ligar um cabo de rede direto do roteador ao console para zerar o Jitter."
        }
    };

    window.zoomNode = (nodeId) => {
        const modal = document.getElementById('zoom-modal');
        const data = zoomData[nodeId];
        
        if (!modal || !data) return;

        document.getElementById('zoom-modal-badge').textContent = data.badge;
        document.getElementById('zoom-modal-title').textContent = data.title;
        document.getElementById('zoom-modal-desc').textContent = data.desc;
        document.getElementById('zoom-modal-img').src = data.img;
        document.getElementById('zoom-modal-tip-title').textContent = data.tipTitle;
        document.getElementById('zoom-modal-tip-desc').textContent = data.tipDesc;

        // Render specs list
        const specBox = document.getElementById('zoom-modal-spec-box');
        specBox.innerHTML = '';
        data.specs.forEach(spec => {
            specBox.innerHTML += `
                <div class="zoom-spec-item">
                    <strong>${spec.label}:</strong>
                    <span>${spec.value}</span>
                </div>
            `;
        });

        // Show modal with transition
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 20);
    };

    window.closeZoomNode = (event) => {
        const modal = document.getElementById('zoom-modal');
        if (!modal) return;

        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 350);
    };

    window.restartQuiz = () => {
        document.getElementById('quiz-ended').style.display = 'none';
        document.getElementById('quiz-welcome').style.display = 'block';
    };

    window.printCertificate = () => {
        window.print();
    };

    // --- MODULE 1: INTERACTIVE 7-LAYER OSI MODEL LOGIC ---
    const osiDetails = {
        1: {
            title: "Camada 1: Física",
            color: "var(--danger)",
            desc: "É a parte de hardware puro. Trata de como converter dados binários (0s e 1s) em pulsos elétricos, de luz (laser) ou ondas eletromagnéticas para que viajem pelo espaço físico.",
            hardware: "Cabos de Fibra Óptica, Cabo de Rede (UTP), Ondas de Wi-Fi, Conetor RJ45, Transceivers (MiniGBIC).",
            analog: "A estrada de asfalto ou os trilhos onde o carro viaja física e materialmente."
        },
        2: {
            title: "Camada 2: Enlace de Dados",
            color: "rgba(249, 115, 22, 1)", // Orange
            desc: "Organiza os bits em blocos chamados 'Quadros' (Frames) e adiciona o endereço físico de origem e destino (Endereço MAC). Garante que a comunicação de cabo a cabo ocorra sem colisões.",
            hardware: "Switches L2, Placa de Rede (NIC), Endereço MAC, Protocolo Ethernet.",
            analog: "O painel do carro ou a placa do carro que identifica o veículo localmente e garante que ele não colida com o carro ao lado."
        },
        3: {
            title: "Camada 3: Rede",
            color: "var(--warning)", // Yellow
            desc: "Responsável pelo endereçamento lógico mundial. Cria os 'Pacotes' de dados e define qual o melhor caminho (rota) que eles devem fazer pela internet para ir do cliente até o servidor.",
            hardware: "Roteador Core BGP, Endereço IP (IPv4 / IPv6), Gateway, Protocolo ICMP (Ping), Roteamento Dinâmico.",
            analog: "O sistema GPS e o CEP/Endereço postal de destino que define qual rua ou estrada o carro deve pegar para ir de uma cidade a outra."
        },
        4: {
            title: "Camada 4: Transporte",
            color: "var(--success)", // Green
            desc: "Pega os dados volumosos e quebra em pedaços organizados para envio. O TCP garante que nenhum pedaço se perca (se perder, pede reenvio). O UDP envia na velocidade máxima sem conferência (ideal para lives e jogos).",
            hardware: "Protocolo TCP (Garante entrega confiável) e UDP (Rápido, sem garantia, ex: Games/Streaming).",
            analog: "A transportadora ou os correios que organizam a carga, conferem se nada quebrou e garantem que tudo seja entregue de forma ordenada."
        },
        5: {
            title: "Camada 5: Sessão",
            color: "var(--accent)", // Cyan
            desc: "Estabelece, gerencia e finaliza a conversa entre os dois aplicativos. Garante que se a conexão oscilar temporariamente, a conversa possa ser retomada de onde parou sem precisar reiniciar tudo.",
            hardware: "Sockets de rede, sessões ativas de login (PPPoE/APIs), conexões SQL.",
            analog: "A ligação telefônica em si: o ato de falar 'Alô', manter a linha aberta enquanto conversam e dizer 'Tchau' ao desligar."
        },
        6: {
            title: "Camada 6: Apresentação",
            color: "#6366f1", // Indigo
            desc: "Garante que o receptor entenda o formato dos dados. Se o dado precisa de segurança, ela criptografa (ex: HTTPS). Se for muito pesado, ela comprime (ex: ZIP) para economizar banda.",
            hardware: "Protocolo SSL/TLS (Criptografia HTTPS), Extensões JSON, JPG, MP4, Compressão ZIP.",
            analog: "O tradutor de línguas ou o envelope lacrado que protege a carta para que apenas quem abrir possa lê-la."
        },
        7: {
            title: "Camada 7: Aplicação",
            color: "var(--purple)", // Purple
            desc: "É o aplicativo final que você interage diretamente! O navegador Web conversa em HTTP, o e-mail em SMTP, os games em seus próprios protocolos de aplicação. É a camada do usuário final.",
            hardware: "Google Chrome, WhatsApp, Instagram, Servidor HTTP, Cliente de E-mail (SMTP), DNS.",
            analog: "Você escrevendo a mensagem no papel e interagindo diretamente com o produto final."
        }
    };

    window.showOsiDetail = (layerNum) => {
        const detail = osiDetails[layerNum];
        if (!detail) return;
        
        // Remove active state from all steps
        document.querySelectorAll('.osi-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Add active state to selected step
        const activeStep = document.querySelector(`.osi-step.layer-${layerNum}`);
        if (activeStep) activeStep.classList.add('active');
        
        const detailBox = document.getElementById('osi-detail-box');
        if (!detailBox) return;
        
        detailBox.style.borderColor = detail.color;
        detailBox.style.boxShadow = `0 8px 24px rgba(0, 0, 0, 0.3), 0 0 15px ${detail.color}25`;
        
        detailBox.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
                <span class="osi-num-badge" style="background:${detail.color}">${layerNum}</span>
                <h4 style="color:${detail.color}; font-size:1.15rem; font-weight:800; text-transform:uppercase; margin:0;">${detail.title}</h4>
            </div>
            <p style="font-size:0.88rem; line-height:1.5; color:#ffffff; font-weight:500; margin-bottom:12px;">${detail.desc}</p>
            
            <div style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.05); border-radius:10px; padding:10px; display:flex; flex-direction:column; gap:8px;">
                <div style="font-size:0.8rem; line-height:1.4;"><strong style="color:var(--text-muted)">⚙️ EQUIPAMENTOS / PROTOCOLOS:</strong> <span style="color:#ffffff">${detail.hardware}</span></div>
                <div style="font-size:0.8rem; line-height:1.4;"><strong style="color:var(--text-muted)">💡 ANALOGIA DIDÁTICA:</strong> <span style="color:#e2e8f0; font-style:italic;">"${detail.analog}"</span></div>
            </div>
        `;
    };
    
    // Auto click Layer 7 on first load of Module 1 after a short delay
    setTimeout(() => {
        if (document.getElementById('osi-detail-box')) {
            window.showOsiDetail(7);
        }
    }, 100);
});
