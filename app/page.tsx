"use client"
import { useState } from "react";

export default function Home() {

  const [ convertedFileJson, setConvertedFile ] = useState<any>();

  const onFileSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (!file){
      return alert("Algo deu errado, tente novamente");
    }

    if (file.type !== "text/plain"){
      return alert("Tipo de arquivo incorreto, selecione um arquivo .txt válido");
    }

    const fileContent = await file.text()
    setConvertedFile(fileContent)
  }

  const resetProcess = () => {
    setConvertedFile(null);
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      
      {
        convertedFileJson ? 
          <>
            <h1>
              CONVERTENDO ARQUIVO PARA JSON:
            </h1>
            <p className="mt-10 p-6">
              {convertedFileJson}
            </p>

            <button onClick={resetProcess} className="bg-green-700 px-4 py-1 mt-4 rounded-xl cursor-pointer hover:bg-green-600">
              Resetar processo
            </button>
          </>
        :
          <>
            <h1 className="text-2xl">Insira seu arquivo .csv</h1>
            <div className="bg-green-700 mt-10 px-4 py-2 rounded-xl">
              <input type="file" accept=".txt" onChange={onFileSubmit}/>
            </div>
          </>
      }
    </div>
  );
}
