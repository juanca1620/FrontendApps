import { createContext, useContext, useState, ReactNode } from "react";
import CacheUtil from "../util/CacheUtil";
import { VeterinariaResponseDto } from "../dto/VeterinariaResponseDto";
import React from "react";

interface UserContextType {
  user: VeterinariaResponseDto | null;
  guardarUser: (user: VeterinariaResponseDto) => void;
  eliminarUser: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<VeterinariaResponseDto | null>(CacheUtil.obtenerUserCache());

    const guardarUser = (user: VeterinariaResponseDto) => {
        CacheUtil.guardarUserCache(user);
        setUser(user);
    }

    const eliminarUser = () => {
        CacheUtil.eliminarUserCache();
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, guardarUser, eliminarUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser debe usarse dentro de un UserProvider");
    }
    return context;
};