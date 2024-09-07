class Music {
    constructor(title, singer, image, file) {
        this.title = title;
        this.singer = singer;
        this.image = image;
        this.file = file;
    }
    
    getName() {
        return this.title + " - " + this.singer;
    }
}
//Servis kullanıyorsak oradan çekebiliriz.
//Müzik Listesi
const musicList =[
    new Music("Merdiven", "Dedublüman", "1.jpeg", "1.mp3"),
    new Music("Geçer", "Sezen Aksu", "2.jpeg", "2.mp3"),
    new Music("Analog", "Ceza", "3.jpeg", "3.mp3")
];

