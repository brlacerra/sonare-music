"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSession, signOut } from "next-auth/react"
import { X, User, Settings, LogOut, Headphones, Search, Code, File, Hash } from "lucide-react"

export default function UserMenu() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  if (!session) return null

  return (
    <>
      {/* Botão do usuário */}
      <motion.div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer bg-white flex items-center justify-between space-x-2 text-black px-2 py-2 text-md rounded-lg font-medium"
        whileHover={{ scale: 1.05, backgroundColor: "black", color: "white" }}
      >
        {session.user?.image && (
          <img
            src={session.user.image}
            alt="Foto do usuário"
            className="w-10 h-10 rounded-full border-2 border-black"
          />
        )}
        <span className="hidden sm:block font-bold">
          Olá, {session.user?.name?.split(" ")[0]}
        </span>
      </motion.div>

      {/* Menu lateral */}
      <AnimatePresence >
        {isOpen && (
          <div>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 cursor-pointer"
            />

            {/* Conteúdo do menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bg-black top-0 right-0 h-full w-80 max-w-[90vw]  shadow-xl z-50 flex flex-col"
            >
              {/* Cabeçalho */}
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-white text-lg">Minha Conta</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md hover:bg-gray-700"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              {/* Perfil */}
              <div className="p-6 bg-black flex items-center gap-4 border-b border-gray-100">
                <div className="relative">
                  <img
                    src={session.user?.image ?? ''}
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="font-bold">{session.user?.name}</p>
                  <p className="text-sm text-gray-400">{session.user?.email}</p>
                </div>
              </div>

              {/* Navegação */}
              <nav className="flex-1 bg-black p-4 space-y-2">
                <MenuItem 
                  icon={<Headphones size={18} />}
                  label="Player"
                  href="/player"
                  onClick={() => setIsOpen(false)}
                />
                <MenuItem 
                  icon={<Settings size={18} />}
                  label="Configurações"
                  href="/config"
                  onClick={() => setIsOpen(false)}
                />
                <MenuItem 
                  icon={<Search size={18} />}
                  label="Busca Sequencial"
                  href="/algoritmos/sequencial"
                  onClick={() => setIsOpen(false)}
                />
                <MenuItem 
                  icon={<Search size={18} />}
                  label="Busca Binaria"
                  href="/algoritmos/binaria"
                  onClick={() => setIsOpen(false)}
                />
                <MenuItem 
                  icon={<Code size={18} />}
                  label="Rabin Karp"
                  href="/algoritmos/rabinKarp"
                  onClick={() => setIsOpen(false)}
                />
                <MenuItem 
                  icon={<File size={18} />}
                  label="Compressão de Huffman"
                  href="/algoritmos/huffman"
                  onClick={() => setIsOpen(false)}
                />
                <MenuItem 
                  icon={<Hash size={18} />}
                  label="Hashing"
                  href="/algoritmos/hashing"
                  onClick={() => setIsOpen(false)}
                />
              </nav>

              {/* Rodapé */}
              <div className="p-4 border-t bg-black border-gray-100">
                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center gap-2 p-2 text-red-600 hover:bg-[var(--foreground)] rounded-md transition-colors"
                >
                  <LogOut size={18} />
                  <span className="cursor-pointer">Sair da conta</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

function MenuItem({ icon, label, href, onClick }: { icon: React.ReactNode, label: string, href: string, onClick: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-md hover:bg-[var(--foreground)] transition-colors text-white"
    >
      <div className="text-white">{icon}</div>
      <span className="font-medium">{label}</span>
    </a>
  )
}