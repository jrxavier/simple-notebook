<template>
  <div class="hello">
    <div class="jumbotron text-center">
      <h3 class="display-4">Simple Notebok</h3>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md">
          <h3>Adicionar Nota</h3>
          <button type="button" class="btn btn-primary" @click="addNote" :title="addButtonTitle">
            <i class="fa fa-plus"></i> Nova nota
          </button>
          <div class="container" v-for="note in sortedNotes">
            <span
              @click="selectNote(note)"
              v-bind:class="{'badge': true, 'badge-primary': note === notaSelecionada}"
            >{{note.title}}</span>
            <span class="glyphicon glyphicon-star"></span>
          </div>
        </div>
        <template v-if="notaSelecionada">
          <div class="col-md">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                v-model="notaSelecionada.title"
                placeholder="Note title"
              />
              <div class="input-group-append">
                <button @click="removeNote" class="btn btn-primary" type="button">Remover</button>
              </div>
            </div>
            <div class="form-group green-border-focus">
              <textarea v-model="notaSelecionada.content" class="form-control" rows="3"></textarea>
              <div class="toolbas status-bar">
                <span class="date">
                  <span class="label">Created:</span>
                  <span class="value">{{notaSelecionada.created | date}}</span>
                </span>
                <span class="lines">
                  <span class="label">Lines</span>
                  <span class="value">{{ linesCount }}</span>
                </span>
                <span class="characters">
                  <span class="label">Characters</span>
                  <span class="value">{{ charactersCount }}</span>
                </span>
              </div>
            </div>
          </div>
          <div class="col-md">
            <h3>Visualizar</h3>
            <section class="main">
              <aside class="preview" v-html="notePreview"></aside>
            </section>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      content:
        localStorage.getItem("content") || "You can write in **markdown**",
      notes: JSON.parse(localStorage.getItem("notes")) || [],
      selectedId: localStorage.getItem("selected-id") || null
    };
  },
  created() {
    this.content =
      localStorage.getItem("content") || "You can write in **markdown** ";
  },
  methods: {
    saveNote(val) {
      localStorage.setItem("content", val);
    },
    saveNotes() {
      localStorage.setItem("notes", JSON.stringify(this.notes));
      console.log("Notes saved!", new Date());
    },
    addNote() {
      const time = Date.now();
      const note = {
        id: String(time),
        title: "New note " + (this.notes.length + 1),
        content: "**Ola!** Nova nota",
        created: time,
        favorite: false
      };
      this.notes.push(note);
    },
    selectNote(note) {
      this.selectedId = note.id;
    },
    removeNote() {
      if (this.notaSelecionada && confirm("Remover a nota?")) {
        const index = this.notes.indexOf(this.notaSelecionada);
        if (index !== -1) {
          this.notes.splice(index, 1);
        }
      }
    }
  },
  computed: {
    notePreview() {
      return this.notaSelecionada ? marked(this.notaSelecionada.content) : "";
    },
    addButtonTitle() {
      return this.notes.length + " note(s) already";
    },
    notaSelecionada() {
      return this.notes.find(note => note.id === this.selectedId);
    },
    sortedNotes() {
      return this.notes.slice().sort((a, b) => a.created - b.created);
    },
    linesCount() {
      if (this.notaSelecionada) {
        return this.notaSelecionada.content.split(/\r\n|\r\n/).length;
      }
    },
    wordsCount() {
      if (this.notaSelecionada) {
        var s = this.notaSelecionada.content;
        s = s.replace(/\n/g, " ");
        s = s.replace(/(^\s*)|(\s*$)/gi, "");
        s = s.replace(/\s\s+/gi, " ");
        return s.split(" ").lenght;
      }
    },
    charactersCount() {
      if (this.notaSelecionada) {
        return this.notaSelecionada.content.split("").length;
      }
    }
  },
  watch: {
    notes: {
      handler: "saveNotes",
      deep: true
    },
    selectedId(val) {
      localStorage.setItem("selected-id", val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
