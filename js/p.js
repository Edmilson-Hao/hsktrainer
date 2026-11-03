/* ========================================
   HSK 朗读 — App Logic
   Vanilla JS · Offline-first · SweetAlert2
======================================== */

const STORAGE_KEY = 'hsk_langdu_v1';
const MASTERY_LABELS = ['Novo', 'Aprendendo', 'Conhecido', 'Dominado'];
const MASTERY_CLASSES = ['badge-new', 'badge-learning', 'badge-known', 'badge-mastered'];

// ---------- Dados iniciais (20 frases) ----------
const INITIAL_SENTENCES = [
  {
    id: 1,
    hanzi: '今天上午我在学校和我的朋友一起学习中文，我们看了很多书，也听了老师说的话，觉得非常高兴。',
    pinyin: 'Jīntiān shàngwǔ wǒ zài xuéxiào hé wǒ de péngyou yìqǐ xuéxí Zhōngwén, wǒmen kàn le hěn duō shū, yě tīng le lǎoshī shuō de huà, juéde fēicháng gāoxìng.',
    translation: 'Hoje de manhã eu estudei chinês na escola com meu amigo. Nós lemos muitos livros e também ouvimos o que o professor disse, e ficamos muito felizes.'
  },
  {
    id: 2,
    hanzi: '昨天下午我和爸爸妈妈一起去超市买东西，我们买了很多水果和菜，回家以后一起做饭吃。',
    pinyin: 'Zuótiān xiàwǔ wǒ hé bàba māma yìqǐ qù chāoshì mǎi dōngxi, wǒmen mǎi le hěn duō shuǐguǒ hé cài, huí jiā yǐhòu yìqǐ zuòfàn chī.',
    translation: 'Ontem à tarde eu fui ao supermercado com meu pai e minha mãe. Compramos muitas frutas e legumes e, depois de voltar para casa, cozinhamos juntos.'
  },
  {
    id: 3,
    hanzi: '明天早上我想去学校上课，可是天气很冷，我要穿很多衣服，还要带一杯热水。',
    pinyin: 'Míngtiān zǎoshang wǒ xiǎng qù xuéxiào shàngkè, kěshì tiānqì hěn lěng, wǒ yào chuān hěn duō yīfu, hái yào dài yì bēi rè shuǐ.',
    translation: 'Amanhã de manhã eu quero ir para a escola ter aula, mas o tempo está muito frio. Preciso vestir muitas roupas e também levar um copo de água quente.'
  },
  {
    id: 4,
    hanzi: '现在我在家休息，看着电视，喝一点儿茶，和我的弟弟妹妹一起说话，觉得很高兴。',
    pinyin: 'Xiànzài wǒ zài jiā xiūxi, kàn zhe diànshì, hē yìdiǎnr chá, hé wǒ de dìdi mèimei yìqǐ shuōhuà, juéde hěn gāoxìng.',
    translation: 'Agora estou em casa descansando, assistindo TV, bebendo um pouco de chá e conversando com meu irmão e minha irmã mais novos. Estou muito feliz.'
  },
  {
    id: 5,
    hanzi: '这个星期日我和朋友去看电影，我们坐出租车去电影院，看完以后一起去饭店吃饭。',
    pinyin: 'Zhège xīngqīrì wǒ hé péngyou qù kàn diànyǐng, wǒmen zuò chūzūchē qù diànyǐngyuàn, kàn wán yǐhòu yìqǐ qù fàndiàn chīfàn.',
    translation: 'Neste domingo eu e meu amigo vamos ao cinema. Vamos de táxi até o cinema e, depois do filme, vamos juntos a um restaurante comer.'
  },
  {
    id: 6,
    hanzi: '今天中午我在公司工作，下午我要去银行，晚上回家和家人一起吃晚饭，然后睡觉。',
    pinyin: 'Jīntiān zhōngwǔ wǒ zài gōngsī gōngzuò, xiàwǔ wǒ yào qù yínháng, wǎnshang huí jiā hé jiārén yìqǐ chī wǎnfàn, ránhòu shuìjiào.',
    translation: 'Hoje ao meio-dia estou trabalhando na empresa. À tarde preciso ir ao banco e à noite volto para casa para jantar com a família e depois dormir.'
  },
  {
    id: 7,
    hanzi: '我的老师很喜欢我们，她每天给我们上课，教我们写汉字，读中文书，我们都很高兴。',
    pinyin: 'Wǒ de lǎoshī hěn xǐhuan wǒmen, tā měi tiān gěi wǒmen shàngkè, jiāo wǒmen xiě Hànzì, dú Zhōngwén shū, wǒmen dōu hěn gāoxìng.',
    translation: 'Minha professora gosta muito de nós. Todos os dias ela dá aula, nos ensina a escrever caracteres chineses e a ler livros em chinês. Todos ficamos muito felizes.'
  },
  {
    id: 8,
    hanzi: '上个星期我去医院看病，医生说我没有大问题，只要多休息，多喝水，不要太忙。',
    pinyin: 'Shàng ge xīngqī wǒ qù yīyuàn kànbìng, yīshēng shuō wǒ méiyǒu dà wèntí, zhǐyào duō xiūxi, duō hē shuǐ, búyào tài máng.',
    translation: 'Na semana passada fui ao hospital. O médico disse que não tenho nenhum problema grave, só preciso descansar mais, beber mais água e não ficar muito ocupado.'
  },
  {
    id: 9,
    hanzi: '明天我要去机场送朋友，他要坐飞机回中国，我们会在机场说再见，我觉得有一点儿不高兴。',
    pinyin: 'Míngtiān wǒ yào qù jīchǎng sòng péngyou, tā yào zuò fēijī huí Zhōngguó, wǒmen huì zài jīchǎng shuō zàijiàn, wǒ juéde yǒu yìdiǎnr bù gāoxìng.',
    translation: 'Amanhã vou ao aeroporto acompanhar um amigo. Ele vai pegar o avião de volta para a China. Vamos nos despedir no aeroporto e eu fico um pouco triste.'
  },
  {
    id: 10,
    hanzi: '今天晚上我想给妈妈打电话，问她今天做什么，她说她在家做饭，等我回家一起吃。',
    pinyin: 'Jīntiān wǎnshang wǒ xiǎng gěi māma dǎ diànhuà, wèn tā jīntiān zuò shénme, tā shuō tā zài jiā zuòfàn, děng wǒ huí jiā yìqǐ chī.',
    translation: 'Esta noite quero ligar para minha mãe e perguntar o que ela fez hoje. Ela disse que está em casa cozinhando e esperando eu voltar para comermos juntos.'
  },
  {
    id: 11,
    hanzi: '我有一个哥哥和一个妹妹，我们都在大学学习，每天一起去学校，一起吃饭，一起回家。',
    pinyin: 'Wǒ yǒu yí ge gēge hé yí ge mèimei, wǒmen dōu zài dàxué xuéxí, měi tiān yìqǐ qù xuéxiào, yìqǐ chīfàn, yìqǐ huí jiā.',
    translation: 'Eu tenho um irmão mais velho e uma irmã mais nova. Todos nós estudamos na universidade. Todos os dias vamos juntos para a escola, comemos juntos e voltamos para casa juntos.'
  },
  {
    id: 12,
    hanzi: '这个月我很忙，每天上午上班，下午学习中文，晚上还要做饭，没有很多时间休息。',
    pinyin: 'Zhège yuè wǒ hěn máng, měi tiān shàngwǔ shàngbān, xiàwǔ xuéxí Zhōngwén, wǎnshang hái yào zuòfàn, méiyǒu hěn duō shíjiān xiūxi.',
    translation: 'Este mês estou muito ocupado. Todas as manhãs vou trabalhar, à tarde estudo chinês e à noite ainda preciso cozinhar. Não tenho muito tempo para descansar.'
  },
  {
    id: 13,
    hanzi: '昨天天气很好，我和下朋友一起去公园玩，我们看了很多花，也拍了很多照片，很高兴。',
    pinyin: 'Zuótiān tiānqì hěn hǎo, wǒ hé péngyou yìqǐ qù gōngyuán wán, wǒmen kàn le hěn duō huā, yě pāi le hěn duō zhàopiàn, hěn gāoxìng.',
    translation: 'Ontem o tempo estava muito bom. Fui ao parque com um amigo. Vimos muitas flores e tiramos muitas fotos. Ficamos muito felizes.'
  },
  {
    id: 14,
    hanzi: '请问，去火车站怎么走？我可以坐几路车？要多长时间？谢谢您告诉我。',
    pinyin: 'Qǐngwèn, qù huǒchēzhàn zěnme zǒu? Wǒ kěyǐ zuò jǐ lù chē? Yào duō cháng shíjiān? Xièxie nín gàosu wǒ.',
    translation: 'Por favor, como se chega à estação de trem? Posso pegar qual ônibus? Quanto tempo leva? Obrigado por me informar.'
  },
  {
    id: 15,
    hanzi: '我喜欢吃中国菜，特别是包子和饺子，也喜欢喝热茶，觉得非常好吃，也很好喝。',
    pinyin: 'Wǒ xǐhuan chī Zhōngguó cài, tèbié shì bāozi hé jiǎozi, yě xǐhuan hē rè chá, juéde fēicháng hǎochī, yě hěn hǎohē.',
    translation: 'Eu gosto de comer comida chinesa, especialmente pãezinhos recheados e pastéis. Também gosto de beber chá quente. Acho muito gostoso e também muito agradável de beber.'
  },
  {
    id: 16,
    hanzi: '今天我没有去学校，因为我有一点儿不舒服，在家休息，看书，听中文歌，感觉好多了。',
    pinyin: 'Jīntiān wǒ méiyǒu qù xuéxiào, yīnwèi wǒ yǒu yìdiǎnr bù shūfu, zài jiā xiūxi, kàn shū, tīng Zhōngwén gē, gǎnjué hǎo duō le.',
    translation: 'Hoje não fui à escola porque estava um pouco indisposto. Fiquei em casa descansando, lendo e ouvindo músicas em chinês. Já me sinto bem melhor.'
  },
  {
    id: 17,
    hanzi: '我们班有很多同学，大家都很喜欢学习中文，每天一起上课，一起说话，一起写汉字。',
    pinyin: 'Wǒmen bān yǒu hěn duō tóngxué, dàjiā dōu hěn xǐhuan xuéxí Zhōngwén, měi tiān yìqǐ shàngkè, yìqǐ shuōhuà, yìqǐ xiě Hànzì.',
    translation: 'Na nossa turma há muitos colegas. Todo mundo gosta muito de estudar chinês. Todos os dias temos aula juntos, conversamos e escrevemos caracteres juntos.'
  },
  {
    id: 18,
    hanzi: '明天是我的生日，我想请一些朋友来我家，一起吃饭，唱歌，看电视，会很高兴。',
    pinyin: 'Míngtiān shì wǒ de shēngrì, wǒ xiǎng qǐng yìxiē péngyou lái wǒ jiā, yìqǐ chīfàn, chànggē, kàn diànshì, huì hěn gāoxìng.',
    translation: 'Amanhã é meu aniversário. Quero convidar alguns amigos para minha casa. Vamos comer juntos, cantar e assistir TV. Vai ser muito divertido.'
  },
  {
    id: 19,
    hanzi: '我的家在北京，爸爸在公司工作，妈妈在学校当老师，我是大学生，现在在家学习。',
    pinyin: 'Wǒ de jiā zài Běijīng, bàba zài gōngsī gōngzuò, māma zài xuéxiào dāng lǎoshī, wǒ shì dàxuéshēng, xiànzài zài jiā xuéxí.',
    translation: 'Minha casa fica em Pequim. Meu pai trabalha em uma empresa, minha mãe é professora na escola e eu sou universitário. Agora estou estudando em casa.'
  },
  {
    id: 20,
    hanzi: '晚上七点我和下朋友一起去饭店吃饭，我们点了很多菜，吃完以后一起回家，很开心。',
    pinyin: 'Wǎnshang qī diǎn wǒ hé péngyou yìqǐ qù fàndiàn chīfàn, wǒmen diǎn le hěn duō cài, chī wán yǐhòu yìqǐ huí jiā, hěn kāixīn.',
    translation: 'Às sete da noite fui com um amigo a um restaurante. Pedimos muitos pratos. Depois de comer voltamos juntos para casa. Ficamos muito felizes.'
  }
];

// ---------- Estado ----------
let state = {
  sentences: [],
  mastery: {},          // { id: 0|1|2|3 }
  currentTab: 'frases',
  currentId: null,
  isPlaying: false,
  showPinyin: false,
  showTranslation: false,
  speechRate: 0.75      // 0.5 ~ 1.4
};

let synth = window.speechSynthesis;
let currentUtterance = null;
let highlightInterval = null;

// ---------- Persistência ----------
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      state.mastery = saved.mastery || {};
      if (typeof saved.speechRate === 'number') {
        state.speechRate = Math.min(1.4, Math.max(0.5, saved.speechRate));
      }
    }
  } catch (e) {
    console.warn('Erro ao carregar estado', e);
  }

  // Garante que todas as frases existem
  state.sentences = INITIAL_SENTENCES.map(s => ({
    ...s,
    mastery: state.mastery[s.id] ?? 0
  }));
}

function saveState() {
  const toSave = {
    mastery: {},
    speechRate: state.speechRate
  };
  state.sentences.forEach(s => {
    toSave.mastery[s.id] = s.mastery;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
}

// ---------- UI Helpers ----------
function showToast(msg, duration = 1800) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  el.classList.add('show');
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.classList.add('hidden'), 250);
  }, duration);
}

function setMastery(id, level) {
  const s = state.sentences.find(x => x.id === id);
  if (!s) return;
  s.mastery = level;
  state.mastery[id] = level;
  saveState();
  showToast(MASTERY_LABELS[level]);
}

// ---------- TTS + Highlight ----------
function stopSpeaking() {
  if (synth.speaking) synth.cancel();
  if (highlightInterval) {
    clearInterval(highlightInterval);
    highlightInterval = null;
  }
  state.isPlaying = false;
  currentUtterance = null;

  // Remove highlights
  document.querySelectorAll('.hanzi-display .char').forEach(c => {
    c.classList.remove('active', 'spoken');
  });
}

function speakSentence(sentence) {
  stopSpeaking();

  if (!synth) {
    Swal.fire({
      title: 'Erro',
      text: 'Seu navegador não suporta síntese de voz.',
      icon: 'error',
      background: '#1e293b',
      color: '#f1f5f9',
      confirmButtonColor: '#f59e0b'
    });
    return;
  }

  const chars = [...sentence.hanzi]; // array de caracteres
  const display = document.getElementById('hanziDisplay');
  if (!display) return;

  // Monta spans
  display.innerHTML = chars.map((ch, i) =>
    `<span class="char" data-i="${i}">${ch}</span>`
  ).join('');

  const utterance = new SpeechSynthesisUtterance(sentence.hanzi);
  utterance.lang = 'zh-CN';
  utterance.rate = state.speechRate;
  utterance.pitch = 1;

  // Tenta usar voz chinesa se disponível
  const voices = synth.getVoices();
  const zhVoice = voices.find(v => v.lang.startsWith('zh') || v.lang.includes('Chinese'));
  if (zhVoice) utterance.voice = zhVoice;

  let currentIndex = 0;
  const totalChars = chars.length;

  // Base ~310ms em rate 0.75 → escala inversamente com a velocidade
  // rate 0.5 → mais lento (~465ms), rate 1.2 → mais rápido (~194ms)
  const baseMs = 310;
  const baseRate = 0.75;
  const msPerChar = Math.round(baseMs * (baseRate / state.speechRate));

  utterance.onstart = () => {
    state.isPlaying = true;
    updatePlayButton(true);

    // Pequeno atraso inicial para sincronizar melhor com o início da fala
    const initialDelay = Math.round(180 * (baseRate / state.speechRate));
    setTimeout(() => {
      highlightInterval = setInterval(() => {
        // Marca os anteriores como spoken
        document.querySelectorAll('.hanzi-display .char').forEach((el, idx) => {
          el.classList.remove('active');
          if (idx < currentIndex) el.classList.add('spoken');
        });

        if (currentIndex < totalChars) {
          const el = document.querySelector(`.hanzi-display .char[data-i="${currentIndex}"]`);
          if (el) el.classList.add('active');
          currentIndex++;
        } else {
          clearInterval(highlightInterval);
        }
      }, msPerChar);
    }, initialDelay);
  };

  utterance.onend = () => {
    stopSpeaking();
    updatePlayButton(false);
    // Marca todos como spoken no final
    document.querySelectorAll('.hanzi-display .char').forEach(c => {
      c.classList.add('spoken');
      c.classList.remove('active');
    });
  };

  utterance.onerror = () => {
    stopSpeaking();
    updatePlayButton(false);
  };

  currentUtterance = utterance;
  synth.speak(utterance);
}

function updatePlayButton(playing) {
  const btn = document.getElementById('btnPlay');
  if (!btn) return;
  if (playing) {
    btn.innerHTML = '⏸ Pausar';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-outline');
  } else {
    btn.innerHTML = '▶ Ouvir';
    btn.classList.remove('btn-outline');
    btn.classList.add('btn-primary');
  }
}

// ---------- Render ----------
function render() {
  const main = document.getElementById('main');
  if (!main) return;

  if (state.currentTab === 'frases') {
    if (state.currentId) {
      renderDetail(main);
    } else {
      renderList(main);
    }
  } else if (state.currentTab === 'estudo') {
    renderEstudo(main);
  } else {
    renderProgresso(main);
  }
}

function renderList(container) {
  const html = `
    <div class="card">
      <div class="card-title">Todas as frases · ${state.sentences.length}</div>
      <div id="sentenceList">
        ${state.sentences.map(s => `
          <div class="sentence-item" data-id="${s.id}">
            <div class="sentence-num ${s.mastery === 3 ? 'mastered' : ''}">${s.id}</div>
            <div class="sentence-body">
              <div class="sentence-hanzi">${s.hanzi.slice(0, 28)}${s.hanzi.length > 28 ? '…' : ''}</div>
              <div class="sentence-meta">
                <span class="badge ${MASTERY_CLASSES[s.mastery]}">${MASTERY_LABELS[s.mastery]}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  container.innerHTML = html;

  container.querySelectorAll('.sentence-item').forEach(el => {
    el.addEventListener('click', () => {
      state.currentId = Number(el.dataset.id);
      state.showPinyin = false;
      state.showTranslation = false;
      stopSpeaking();
      render();
    });
  });
}

function renderDetail(container) {
  const s = state.sentences.find(x => x.id === state.currentId);
  if (!s) {
    state.currentId = null;
    render();
    return;
  }

  container.innerHTML = `
    <button class="back-btn" id="btnBack">← Voltar</button>

    <div class="card player-card">
      <div class="card-title">Frase ${s.id}</div>
      <div class="hanzi-display" id="hanziDisplay">${s.hanzi}</div>

      <div class="controls">
        <button class="btn btn-primary" id="btnPlay">▶ Ouvir</button>
        <button class="btn btn-outline" id="btnStop">Parar</button>
      </div>

      <div class="speed-control">
        <div class="speed-label">
          <span>Velocidade</span>
          <span id="speedValue">${state.speechRate.toFixed(2)}x</span>
        </div>
        <input type="range" id="speedSlider" min="0.5" max="1.4" step="0.05" value="${state.speechRate}" />
      </div>

      <div class="reveal-row">
        <button class="reveal-btn ${state.showPinyin ? 'active' : ''}" id="btnPinyin">Pinyin</button>
        <button class="reveal-btn ${state.showTranslation ? 'active' : ''}" id="btnTrans">Tradução</button>
      </div>

      <div class="reveal-content ${state.showPinyin ? 'show' : ''}" id="pinyinBox">
        <div class="pinyin-text">${s.pinyin}</div>
      </div>
      <div class="reveal-content ${state.showTranslation ? 'show' : ''}" id="transBox">
        <div class="translation-text">${s.translation}</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Nível de domínio</div>
      <div class="mastery-row">
        ${[0,1,2,3].map(lvl => `
          <button class="mastery-btn ${s.mastery === lvl ? 'active' : ''}" data-level="${lvl}">
            ${MASTERY_LABELS[lvl]}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Eventos
  document.getElementById('btnBack').addEventListener('click', () => {
    stopSpeaking();
    state.currentId = null;
    render();
  });

  document.getElementById('btnPlay').addEventListener('click', () => {
    if (state.isPlaying) {
      stopSpeaking();
      updatePlayButton(false);
    } else {
      speakSentence(s);
    }
  });

  document.getElementById('btnStop').addEventListener('click', () => {
    stopSpeaking();
    updatePlayButton(false);
  });

  // Controle de velocidade
  const slider = document.getElementById('speedSlider');
  const speedValue = document.getElementById('speedValue');
  slider.addEventListener('input', () => {
    const val = parseFloat(slider.value);
    state.speechRate = val;
    speedValue.textContent = val.toFixed(2) + 'x';
    saveState();
  });

  document.getElementById('btnPinyin').addEventListener('click', () => {
    state.showPinyin = !state.showPinyin;
    document.getElementById('pinyinBox').classList.toggle('show', state.showPinyin);
    document.getElementById('btnPinyin').classList.toggle('active', state.showPinyin);
  });

  document.getElementById('btnTrans').addEventListener('click', () => {
    state.showTranslation = !state.showTranslation;
    document.getElementById('transBox').classList.toggle('show', state.showTranslation);
    document.getElementById('btnTrans').classList.toggle('active', state.showTranslation);
  });

  document.querySelectorAll('.mastery-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lvl = Number(btn.dataset.level);
      setMastery(s.id, lvl);
      // Re-render para atualizar botões
      renderDetail(container);
    });
  });
}

function renderEstudo(container) {
  const weak = state.sentences.filter(s => s.mastery < 2);
  const learning = state.sentences.filter(s => s.mastery === 1);

  container.innerHTML = `
    <div class="card">
      <div class="card-title">Modos de estudo</div>
      <div class="btn-group mt-8">
        <button class="btn btn-primary btn-block" id="btnSeq">Sequencial</button>
      </div>
      <div class="btn-group mt-8">
        <button class="btn btn-outline btn-block" id="btnRandom">Aleatório</button>
      </div>
      <div class="btn-group mt-8">
        <button class="btn btn-outline btn-block" id="btnWeak">
          Só as fracas (${weak.length})
        </button>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Dica de estudo</div>
      <p class="text-muted" style="font-size:0.9rem; line-height:1.5">
        Ouça a frase enquanto lê o hanzi destacado. Depois revele o pinyin e a tradução.
        Marque o nível de domínio conforme for se sentindo mais seguro.
      </p>
    </div>
  `;

  document.getElementById('btnSeq').addEventListener('click', () => {
    const next = state.sentences.find(s => s.mastery < 3) || state.sentences[0];
    state.currentId = next.id;
    state.currentTab = 'frases';
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector('[data-tab="frases"]').classList.add('active');
    render();
  });

  document.getElementById('btnRandom').addEventListener('click', () => {
    const pool = state.sentences;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    state.currentId = pick.id;
    state.currentTab = 'frases';
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector('[data-tab="frases"]').classList.add('active');
    render();
  });

  document.getElementById('btnWeak').addEventListener('click', () => {
    if (weak.length === 0) {
      showToast('Nenhuma frase fraca no momento');
      return;
    }
    const pick = weak[Math.floor(Math.
