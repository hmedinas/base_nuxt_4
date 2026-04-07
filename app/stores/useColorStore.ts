import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import type { PrimaryColors } from "~/types/primaryColors.interface";
import type {  SettingApp } from "~/types/settingApp.interface";

// Función que define el estado inicial
const initialPrimariColor = (): PrimaryColors => {
    return {
      
        buttonClassPrimary : 'bg-primary  text-white',       
        textClassPrimary :'text-primary'
    };
  };

const initialSettingApp = () : SettingApp =>{
  return {
    isMenuCollapsed : false,    
    isDark : false,    
    isMenuHorizontal : false,
    menuClass : "bg-application-blue-600",
    topbarClass : "bg-application-silver-100",
    fondoClass : "bg-fondo-100",
    primaryColor : "bg-primary"
  }
}
  

export const useColorStore = defineStore('color', () => {
  
    const colorApplication = ref(useLocalStorage<PrimaryColors>('color', initialPrimariColor()));

    const settingApp =  ref<SettingApp>(initialSettingApp())

    // Métodos para actualizar los colores
    const setPrimaryColor = (colorClass: string) => {
        colorApplication.value.buttonClassPrimary = `${colorClass} text-white`
        colorApplication.value.textClassPrimary = colorClass.replace('bg-','text-');        
    };

    const setDefaultColor = () =>{
      settingApp.value = initialSettingApp();
      setPrimaryColor(settingApp.value.primaryColor)
    }
  // ===== Método para modo oscuro =====
    const setDarkMode = (value: boolean) => {
  settingApp.value.isDark = value
  // opcional: actualizar localStorage si quieres persistencia
  localStorage.setItem('settingApp', JSON.stringify(settingApp.value))
}

    // Cargar colores del localStorage
     

  
    return {
        settingApp,
        colorApplication,
        setPrimaryColor,
        setDefaultColor,
        setDarkMode
    };
  });