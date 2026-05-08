"use client"
import { useState } from "react";
import CSVLineParser from "@/services/CSVLineParser";

export default function Home() {

  const [ convertedFileJson, setConvertedFile ] = useState<any>();
  const [ fileName, setFileName ] = useState<string>("");

  const onFileSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (!file){
      return alert("Algo deu errado, tente novamente");
    }

    if (file.type !== "text/plain"){
      return alert("Tipo de arquivo incorreto, selecione um arquivo .txt válido");
    }

    const fileContent = await file.text()
    if (!fileContent){
      return alert("Algo deu errado, tente novamente");
    }

    const csvLineParser = new CSVLineParser(fileContent);
    const parsedFile = csvLineParser.parse();

    if (!parsedFile || parsedFile.length === 0){
      return alert("Algo deu errado, tente novamente");
    }

    setFileName(file.name.replace(".txt", ""));
    setConvertedFile(JSON.stringify(parsedFile, null, 2));

  }

  const resetProcess = () => {
    setConvertedFile(null);
    setFileName("");
  }

  const downloadJSON = () => {
    const element = document.createElement("a");
    const file = new Blob([convertedFileJson], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName || "convertido"}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 font-sans px-4">
      {
        convertedFileJson ? 
          <div className="w-full max-w-4xl bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl shadow-2xl p-8">
            <h1 className="text-3xl font-bold text-center text-white mb-2">
              Arquivo Convertido!
            </h1>
            <p className="text-center text-slate-400 mb-6">
              Seu arquivo CSV foi convertido com sucesso para JSON
            </p>
            
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 mb-6 overflow-auto max-h-96">
              <pre className="text-sm text-slate-300 font-mono">
                {convertedFileJson}
              </pre>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <button 
                onClick={downloadJSON} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition-all shadow-lg border border-blue-500/30"
              >
                Baixar JSON
              </button>
              <button 
                onClick={resetProcess} 
                className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition-all shadow-lg border border-slate-600/30"
              >
                Converter Outro
              </button>
            </div>
          </div>
        :
          <div className="w-full max-w-md bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl shadow-2xl p-10 text-center">
            <h1 className="text-4xl font-bold text-white mb-3">
              CSV to JSON
            </h1>
            <p className="text-slate-400 mb-8">
              Converta seus arquivos CSV em JSON de forma rápida e eficiente
            </p>
            
            <label className="inline-block bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-lg cursor-pointer transition-all shadow-lg border border-blue-500/30">
              Escolher arquivo
              <input 
                type="file" 
                accept=".txt" 
                onChange={onFileSubmit}
                className="hidden"
              />
            </label>
            
            <p className="text-slate-500 text-sm mt-6">
              Formatos suportados: .txt (CSV)
            </p>
          </div>
      }
    </div>
  );
}
