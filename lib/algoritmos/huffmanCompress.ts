import { prisma } from "../prisma";

type HuffmanNode = {
  char?: string;
  freq: number;
  left?: HuffmanNode;
  right?: HuffmanNode;
};

type CodeMap = Record<string, string>;

function buildFrequencyMap(text: string): Record<string, number> {
  const freqMap: Record<string, number> = {};
  for (const char of text) {
    freqMap[char] = (freqMap[char] || 0) + 1;
  }
  return freqMap;
}

function buildHuffmanTree(freqMap: Record<string, number>): HuffmanNode {
  const nodes: HuffmanNode[] = Object.entries(freqMap).map(([char, freq]) => ({
    char,
    freq,
  }));

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);

    const left = nodes.shift()!;
    const right = nodes.shift()!;

    const newNode: HuffmanNode = {
      freq: left.freq + right.freq,
      left,
      right,
    };

    nodes.push(newNode);
  }

  return nodes[0];
}

function buildCodeMap(node: HuffmanNode, prefix = "", codeMap: CodeMap = {}) {
  if (!node.left && !node.right && node.char) {
    codeMap[node.char] = prefix || "0";
  } else {
    if (node.left) buildCodeMap(node.left, prefix + "0", codeMap);
    if (node.right) buildCodeMap(node.right, prefix + "1", codeMap);
  }
  return codeMap;
}

function compressText(text: string, codeMap: CodeMap): string {
  let result = "";
  for (const char of text) {
    result += codeMap[char];
  }
  return result;
}

export async function huffmanCompress() {
  const usuarios = await prisma.usuario.findMany({
    select: { nome: true },
  });

  const allNames = usuarios.map(u => u.nome).join("");

  const freqMap = buildFrequencyMap(allNames);

  const tree = buildHuffmanTree(freqMap);

  const codeMap = buildCodeMap(tree);

  const compressedList = usuarios.map(({ nome }) => ({
    nome,
    comprimido: compressText(nome, codeMap),
  }));

  return compressedList;
}
