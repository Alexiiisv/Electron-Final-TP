const {
  default: AsyncStorage,
} = require("@react-native-async-storage/async-storage");
const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("versions", process.versions);
  contextBridge.exposeInMainWorld("dialog", {
    open: async () => {
      ipcRenderer.send("open-file-dialog");
    },
    read: (path, setstate) => {
      fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
          alert("An error ocurred reading the file :" + err.message);
          return;
        }
        console.log(data);
        setstate(data);
      });
    },
    getSavedPath: (setstate) => {
      ipcRenderer.on("selected-directory", async (_, path) => {
        setstate(path);
      });
    },
  });
});
