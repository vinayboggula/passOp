import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-black text-white text-sm flex justify-center items-center  bottom-0 left-0 w-full py-3 border-t border-green-500">
            <p className="flex items-center gap-1">
                Made with ❤️ by Vinay | © {new Date().getFullYear()}{" "}
                <span className="text-green-500">&lt;</span>
                <span>Pass</span>
                <span className="text-green-500">OP/&gt;</span>
            </p>
        </footer>
    )
}

export default Footer

