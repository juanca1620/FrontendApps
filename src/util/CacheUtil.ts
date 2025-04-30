import { VeterinariaResponseDto } from "../dto/VeterinariaResponseDto";

const obtenerUserCache = (): VeterinariaResponseDto | null => {
    const userCache = localStorage.getItem("vetery_user");
    if (userCache) {
        return JSON.parse(userCache) as VeterinariaResponseDto;
    }
    return null;
}

const guardarUserCache = (user: VeterinariaResponseDto) => {
    localStorage.setItem("vetery_user", JSON.stringify(user));
}

const eliminarUserCache = () => {
    localStorage.removeItem("vetery_user");
}

export default { obtenerUserCache ,guardarUserCache ,eliminarUserCache}