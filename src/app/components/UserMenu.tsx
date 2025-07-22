"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSession, signOut } from "next-auth/react"
import { X, User, Settings, LogOut, Headphones, Search, Code, File, Hash } from "lucide-react"
import { i } from "framer-motion/client"

export default function UserMenu() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const MenuItems = [
    { name: "Player", icon: <Headphones size={18} />, href: "/player" },
    { name: "Configurações", icon: <Settings size={18} />, href: "/config" },
    { name: "Busca Sequencial", icon: <Search size={18} />, href: "/algoritmos/sequencial" },
    { name: "Busca Binária", icon: <Search size={18} />, href: "/algoritmos/binaria" },
    { name: "Rabin Karp", icon: <Code size={18} />, href: "/algoritmos/rabinKarp" },
    { name: "Compressão de Huffman", icon: <File size={18} />, href: "/algoritmos/huffman" },
    { name: "Hashing", icon: <Hash size={18} />, href: "/algoritmos/hashing" },
    { name: "Hashing (Deslocado, Multiplicação)", icon: <Hash size={18} />, href: "/algoritmos/hashDesloc" },
  ]

  if (!session) return null

  return (
    <>
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

      <AnimatePresence>
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
              className="fixed bg-black top-0 right-0 h-screen w-80 max-w-[90vw] shadow-xl z-50 flex flex-col overflow-y-auto"
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
                {MenuItems.map((item) => (
                  <MenuItem
                    key={item.name}
                    icon={item.icon}
                    label={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
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