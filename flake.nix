{
  description = "Home Assistant configuration";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
  };

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
    in
    {
      devShells = forAllSystems (pkgs:
        let
          # Same version as CI.
          python = pkgs.python313.withPackages (ps: [ ps.pyyaml ]);
        in
        {
          default = pkgs.mkShell {
            packages = [
              python
              pkgs.yamllint
              pkgs.gnumake
              pkgs.git
              pkgs.openssh
            ];
          };
        });
    };
}
