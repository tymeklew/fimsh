use std::process::Command;
fn main() {
    Command::new("npm")
        .arg("run")
        .arg("build")
        .arg("--prefix")
        .arg("client")
        .spawn()
        .unwrap();
}
